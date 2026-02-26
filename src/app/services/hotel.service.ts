import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // 1. Get Hotels (with Search)
  getHotels(location?: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`).pipe(
      map(hotels => {
        if (location) {
          return hotels.filter(hotel => 
            hotel.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        return hotels;
      })
    );
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms?hotelId=${hotelId}`);
  }

  // 2. Get Room by ID
  getRoomById(roomId: string | number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/rooms/${roomId}`);
  }

  // 👇 FIXED: Changed 'number' to 'string | number' to allow "a1b2" style IDs
  getBookingById(id: string | number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  // 4. Create Booking
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
  }

  // 5. Get Bookings by Email (For My Bookings Page)
  getBookingsByEmail(email: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings?email=${email}`);
  }
}