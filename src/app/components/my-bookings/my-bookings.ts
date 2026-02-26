import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(private hotelService: HotelService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUserValue();
    if (user && user.email) {
      this.hotelService.getBookingsByEmail(user.email).subscribe(data => {
        this.bookings = data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}