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
  booking: Booking | undefined;
  room: Room | undefined;
  hotel: Hotel | undefined;
  
  isLoading = true;
  errorMessage = '';
  assignedRoomNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    // 👇 FIXED: Removed Number() so it handles string IDs like "a1b2"
    const bookingId = this.route.snapshot.paramMap.get('id');
    
    this.assignedRoomNumber = Math.floor(Math.random() * 500) + 100;

    if (bookingId) {
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
                error: (err) => this.handleError('Could not find hotel details.', err)
              });
            },
            error: (err) => this.handleError('Could not find room details.', err)
          });
        },
        error: (err) => this.handleError('Booking not found. Please try again.', err)
      });
    } else {
      this.handleError('Invalid Booking ID.', null);
    }
  }

  private handleError(message: string, error: any) {
    console.error(error);
    this.errorMessage = message;
    this.isLoading = false;
  }
}