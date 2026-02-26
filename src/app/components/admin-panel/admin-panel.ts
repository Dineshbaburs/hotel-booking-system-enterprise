import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http'; // Assuming you fetch directly or via a service
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'guestName', 'roomId', 'checkInDate', 'status', 'actions'];
  bookings: Booking[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Ideally, this should be in your BookingService
    this.http.get<Booking[]>('http://localhost:3000/bookings').subscribe(data => {
      this.bookings = data;
    });
  }

  cancelBooking(id: string | number) {
    // Logic to cancel/delete booking
    alert(`Cancel booking ${id} functionality to be implemented`);
  }
}