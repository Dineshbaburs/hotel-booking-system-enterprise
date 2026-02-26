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
    // 1. Ask for confirmation before cancelling
    if (confirm(`Are you sure you want to cancel booking #${id}?`)) {
      
      // 2. Send PATCH request to update status in db.json
      this.http.patch(`${this.apiUrl}/${id}`, { status: 'cancelled' }).subscribe({
        
        next: () => {
          // 3. Show success message (Guideline 8)
          this.snackBar.open(`Booking #${id} cancelled successfully!`, 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          
          // 4. Update the local table UI immediately
          const updatedBooking = this.bookings.find(b => b.id === id);
          if (updatedBooking) {
            updatedBooking.status = 'cancelled';
          }
        },
        
        error: (err) => {
          // Show error message if API fails
          console.error(err);
          this.snackBar.open('Failed to cancel booking. Please try again.', 'Close', { 
            duration: 3000 
          });
        }
      });
    }
  }
}