import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // <--- NEW Import
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    HttpClientModule, 
    MatSnackBarModule // <--- NEW Module
  ],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'guestName', 'roomId', 'checkInDate', 'status', 'actions'];
  bookings: Booking[] = [];
  private apiUrl = 'http://localhost:3000/bookings';

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar // <--- Inject SnackBar
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.http.get<Booking[]>(this.apiUrl).subscribe(data => {
      this.bookings = data;
    });
  }

  cancelBooking(id: string | number) {
    if (confirm(`Are you sure you want to cancel booking #${id}?`)) {
      // Send PATCH request to update status in db.json
      this.http.patch(`http://localhost:3000/bookings/${id}`, { status: 'cancelled' }).subscribe({
        next: () => {
          this.snackBar.open(`Booking #${id} cancelled successfully!`, 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          // Update the table UI immediately
          const updatedBooking = this.bookings.find(b => b.id === id);
          if (updatedBooking) {
            updatedBooking.status = 'cancelled';
          }
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to cancel booking. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}