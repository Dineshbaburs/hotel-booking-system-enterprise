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
  roomId!: string;   // ✅ STRING — VERY IMPORTANT
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
      email: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('roomId');

    if (param) {
      this.roomId = param;   // ✅ NO Number()
      this.fetchRoomAndHotelDetails();
    }
  }

  fetchRoomAndHotelDetails() {
    this.http.get<any>(`https://hotel-booking-system-enterprise.onrender.com/rooms/${this.roomId}`)
      .subscribe({
        next: (room) => {
          this.roomDetails = room;

          this.http.get<any>(`https://hotel-booking-system-enterprise.onrender.com/hotels/${room.hotelId}`)
            .subscribe({
              next: (hotel) => {
                this.hotelDetails = hotel;
              }
            });
        },
        error: (err) => console.error("Error fetching room data:", err)
      });
  }

  onSubmit(): void {

    if (this.bookingForm.invalid || !this.roomDetails) return;

    const checkIn = new Date(this.bookingForm.value.checkInDate);
    const checkOut = new Date(this.bookingForm.value.checkOutDate);

    const diff = checkOut.getTime() - checkIn.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    const totalPrice =
      days > 0 ? days * this.roomDetails.price : this.roomDetails.price;

    const bookingData: Booking = {
      roomId: this.roomId,  // ✅ string
      guestName: this.bookingForm.value.guestName,
      email: this.bookingForm.value.email,
      checkInDate: this.bookingForm.value.checkInDate,
      checkOutDate: this.bookingForm.value.checkOutDate,
      totalPrice: totalPrice,
      status: 'confirmed'
    };

    this.hotelService.createBooking(bookingData).subscribe({
      next: (newBooking) => {

        console.log("Created booking:", newBooking);

        if (newBooking?.id) {
          this.router.navigate(['/confirmation', newBooking.id]);
        } else {
          console.error("Booking ID missing!");
        }
      },
      error: (err) => console.error("Booking failed:", err)
    });
  }
}