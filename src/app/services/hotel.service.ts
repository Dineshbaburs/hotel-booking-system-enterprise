import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // ✅ PRODUCTION BACKEND URL (Render HTTPS)
  private apiUrl = 'https://hotel-booking-system-enterprise.onrender.com';

  constructor(private http: HttpClient) {}

  // ================================
  // 1️⃣ HOTELS
  // ================================

  getHotels(location?: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`).pipe(
      map(hotels => {
        if (location) {
          return hotels.filter(hotel =>
            hotel.location?.toLowerCase().includes(location.toLowerCase())
          );
        }
        return hotels;
      })
    );
  }

  // ✅ Accept string OR number ID
  getHotelById(id: string | number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  // ================================
  // 2️⃣ ROOMS
  // ================================

  getRoomsByHotelId(hotelId: string | number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms?hotelId=${hotelId}`);
  }

  getRoomById(roomId: string | number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/${roomId}`);
  }

  // ================================
  // 3️⃣ BOOKINGS
  // ================================

  // ✅ VERY IMPORTANT — must support string IDs
  getBookingById(id: string | number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
  }

  getBookingsByEmail(email: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.apiUrl}/bookings?email=${email}`
    );
  }

}