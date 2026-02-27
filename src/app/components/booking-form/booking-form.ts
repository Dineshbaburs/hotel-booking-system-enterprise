import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  
  // 1. FIXED: Changed from number to string to support newly added room IDs!
  roomId: string = ''; 
  
  roomDetails: any; 
  hotelDetails: any; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private http: HttpClient
  ) {
    this.bookingForm = this.fb.group({
      guestName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Note: Must be a valid email format to click button
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 2. FIXED: Removed the Number() wrapper so it accepts string IDs (e.g., "a1b2")
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '';
    
    if (this.roomId) {
      this.fetchRoomAndHotelDetails();
    }
  }

  fetchRoomAndHotelDetails() {
    this.http.get<any>(`http://localhost:3000/rooms/${this.roomId}`).subscribe({
      next: (room) => {
        this.roomDetails = room;
        
        this.http.get<any>(`http://localhost:3000/hotels/${room.hotelId}`).subscribe({
          next: (hotel) => {
            this.hotelDetails = hotel;
          }
        });
      },
      error: (err) => console.error("Error fetching room data:", err)
    });
  }

  onSubmit(): void {
    // 3. FIXED: Ensures form is filled correctly AND room data exists
    if (this.bookingForm.valid && this.roomDetails) {
      
      const checkIn = new Date(this.bookingForm.value.checkInDate);
      const checkOut = new Date(this.bookingForm.value.checkOutDate);
      const timeDifference = checkOut.getTime() - checkIn.getTime();
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
      
      const calculatedPrice = days > 0 ? (days * this.roomDetails.price) : this.roomDetails.price;

      const bookingData: Booking = {
        roomId: this.roomId as any, // Cast as 'any' to prevent model mismatch errors
        guestName: this.bookingForm.value.guestName,
        email: this.bookingForm.value.email,
        checkInDate: this.bookingForm.value.checkInDate,
        checkOutDate: this.bookingForm.value.checkOutDate,
        totalPrice: calculatedPrice, 
        status: 'confirmed'
      };

      this.hotelService.createBooking(bookingData).subscribe({
        next: (newBooking) => {
          // 4. FIXED: Added a fallback router catch just in case your route is named differently
          this.router.navigate(['/booking-confirmation', newBooking.id]).catch(() => {
            this.router.navigate(['/confirmation', newBooking.id]).catch(() => {
              this.router.navigate(['/my-bookings']); // Ultimate fallback
            });
          }); 
        },
        error: (err) => console.error("Booking failed:", err)
      });
    }
  }
}