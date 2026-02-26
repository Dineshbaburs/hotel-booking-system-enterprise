import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HotelService } from '../../services/hotel.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  roomId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      guestName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData: Booking = {
        roomId: this.roomId,
        guestName: this.bookingForm.value.guestName,
        email: this.bookingForm.value.email,
        checkInDate: this.bookingForm.value.checkInDate,
        checkOutDate: this.bookingForm.value.checkOutDate,
        totalPrice: 0, // This could be calculated based on dates later
        status: 'confirmed'
      };

      // UPDATED LOGIC: Create booking -> Get ID -> Navigate to Receipt
      this.hotelService.createBooking(bookingData).subscribe((newBooking) => {
        this.router.navigate(['/confirmation', newBooking.id]); 
      });
    }
  }
}