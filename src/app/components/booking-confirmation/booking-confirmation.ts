import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HotelService } from '../../services/hotel.service';
import { Booking } from '../../models/booking.model';
import { Room } from '../../models/room.model';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css'
})
export class BookingConfirmationComponent implements OnInit {

  booking!: Booking;
  room!: Room;
  hotel!: Hotel;

  isLoading = true;
  errorMessage = '';
  assignedRoomNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {

    const param = this.route.snapshot.paramMap.get('id');

    if (!param) {
      this.errorMessage = 'Invalid booking ID.';
      this.isLoading = false;
      return;
    }

    const bookingId = Number(param);   // ✅ convert to number

    this.assignedRoomNumber = Math.floor(Math.random() * 500) + 100;

    this.hotelService.getBookingById(bookingId).subscribe({
      next: (bookingData) => {
        this.booking = bookingData;

        this.hotelService.getRoomById(bookingData.roomId).subscribe({
          next: (roomData) => {
            this.room = roomData;

            this.hotelService.getHotelById(roomData.hotelId).subscribe({
              next: (hotelData) => {
                this.hotel = hotelData;
                this.isLoading = false;
              },
              error: () => this.handleError('Hotel details not found.')
            });
          },
          error: () => this.handleError('Room details not found.')
        });
      },
      error: () => this.handleError('Booking not found.')
    });
  }

  private handleError(message: string) {
    this.errorMessage = message;
    this.isLoading = false;
  }
}