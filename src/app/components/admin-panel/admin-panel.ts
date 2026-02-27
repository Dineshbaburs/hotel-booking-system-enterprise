import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../../models/booking.model';
import { Room } from '../../models/room.model';
import { Hotel } from '../../models/hotel.model';
import { RoomFormDialogComponent } from './room-form-dialog/room-form-dialog';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    HttpClientModule, 
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'guestName', 'roomId', 'checkInDate', 'status', 'actions'];
  
  // Columns matching the HTML template for the Manage Rooms tab
  roomDisplayedColumns: string[] = ['image', 'id', 'hotelName', 'location', 'roomNumber', 'type', 'price', 'maxGuests', 'features', 'status', 'actions'];
  
  bookings: Booking[] = [];
  rooms: Room[] = []; 
  hotels: Hotel[] = []; 
  
  private bookingsApiUrl = 'https://hotel-booking-system-enterprise.onrender.com/bookings';
  private roomsApiUrl = 'https://hotel-booking-system-enterprise.onrender.com/rooms';
  private hotelsApiUrl = 'https://hotel-booking-system-enterprise.onrender.com/hotels';

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
    this.fetchRooms();
    this.fetchHotels(); 
  }

  fetchBookings() {
    this.http.get<Booking[]>(this.bookingsApiUrl).subscribe(data => this.bookings = data);
  }

  fetchRooms() {
    this.http.get<Room[]>(this.roomsApiUrl).subscribe(data => this.rooms = data);
  }

  fetchHotels() {
    this.http.get<Hotel[]>(this.hotelsApiUrl).subscribe(data => this.hotels = data);
  }

  // Gets the exact Hotel Name from db.json
  getHotelName(hotelId: number | string): string {
    const hotel = this.hotels.find(h => String(h.id) === String(hotelId));
    return hotel ? hotel.name : 'Unknown Hotel';
  }

  // Gets the exact Location from db.json
  getHotelLocation(hotelId: number | string): string {
    const hotel = this.hotels.find(h => String(h.id) === String(hotelId));
    return hotel ? hotel.location : 'Unknown Location';
  }

  // Gets the exact Thumbnail Image URL from db.json
  getHotelImage(hotelId: number | string): string {
    const hotel = this.hotels.find(h => String(h.id) === String(hotelId));
    return hotel && hotel.thumbnail 
      ? hotel.thumbnail 
      : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80';
  }

  cancelBooking(id: string | number) {
    if (confirm(`Are you sure you want to cancel booking #${id}?`)) {
      this.http.patch(`${this.bookingsApiUrl}/${id}`, { status: 'cancelled' }).subscribe({
        next: () => {
          this.snackBar.open(`Booking #${id} cancelled successfully!`, 'Close', { duration: 3000 });
          const updatedBooking = this.bookings.find(b => b.id === id);
          if (updatedBooking) updatedBooking.status = 'cancelled';
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to cancel booking. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openAddRoomDialog() {
    // FIXED: Now properly passes the 'hotels' array to the Dialog so the dropdown works!
    const dialogRef = this.dialog.open(RoomFormDialogComponent, { 
      width: '600px',
      data: { hotels: this.hotels } 
    });

    dialogRef.afterClosed().subscribe(newRoom => {
      if (newRoom) {
        this.http.post<Room>(this.roomsApiUrl, newRoom).subscribe({
          next: (addedRoom) => {
            this.rooms = [...this.rooms, addedRoom]; 
            this.snackBar.open('Room added successfully!', 'Close', { 
              duration: 3000, panelClass: ['success-snackbar'] 
            });
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  deleteRoom(id: string | number) {
    if (confirm(`Are you sure you want to permanently delete Room #${id}?`)) {
      this.http.delete(`${this.roomsApiUrl}/${id}`).subscribe({
        next: () => {
          this.snackBar.open(`Room #${id} deleted!`, 'Close', { duration: 3000 });
          this.rooms = this.rooms.filter(r => r.id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}