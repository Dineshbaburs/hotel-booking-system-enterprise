import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Required for *ngIf
import { ActivatedRoute, RouterModule } from '@angular/router'; // <--- Required for Links
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    CommonModule, // <--- MUST be here
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule
  ],
  templateUrl: './hotel-detail.html',
  styleUrls: ['./hotel-detail.css'] // <--- Use styleUrls (Safe for all Angular versions)
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | undefined;
  rooms: Room[] = [];

  // --- VARIABLES REQUIRED BY HTML ---
  isLoading: boolean = true;      // <--- Used by *ngIf="isLoading"
  errorMessage: string = '';      // <--- Used by *ngIf="errorMessage"
  // ----------------------------------

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Safety check: If ID is missing or NaN, show error
    if (!id) {
      this.errorMessage = 'Invalid Hotel ID';
      this.isLoading = false;
      return;
    }

    // 1. Get Hotel Details
    this.hotelService.getHotelById(id).subscribe({
      next: (data: Hotel) => {
        this.hotel = data;
        this.isLoading = false; // Data Loaded -> Hide Loading
      },
      error: (err) => {
        console.error('Error fetching hotel:', err);
        this.errorMessage = 'Could not load hotel details. Check if db.json is running.';
        this.isLoading = false;
      }
    });

    // 2. Get Available Rooms
    this.hotelService.getRoomsByHotelId(id).subscribe({
      next: (data: Room[]) => {
        this.rooms = data;
      },
      error: (err) => console.error('Error fetching rooms:', err)
    });
  }
}