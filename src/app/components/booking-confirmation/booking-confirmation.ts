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

  booking?: Booking;
  room?: Room;
  hotel?: Hotel;

  isLoading = true;
  errorMessage = '';

  // ✅ ADD THIS BACK
  assignedRoomNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {

    const bookingId = this.route.snapshot.paramMap.get('id');

    if (!bookingId) {
      this.handleError('Invalid Booking ID.');
      return;
    }

    // Random room number
    this.assignedRoomNumber = Math.floor(Math.random() * 500) + 100;

    this.hotelService.getBookingById(bookingId).subscribe({
      next: (bookingData: any) => {

        if (!bookingData || !bookingData.id) {
          this.handleError('Booking not found.');
          return;
        }

        this.booking = bookingData;

        this.hotelService.getRoomById(bookingData.roomId).subscribe({
          next: (roomData) => {

            if (!roomData) {
              this.handleError('Room not found.');
              return;
            }

            this.room = roomData;

            this.hotelService.getHotelById(roomData.hotelId).subscribe({
              next: (hotelData) => {
                this.hotel = hotelData;
                this.isLoading = false;
              },
              error: () => this.handleError('Hotel not found.')
            });

          },
          error: () => this.handleError('Room not found.')
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