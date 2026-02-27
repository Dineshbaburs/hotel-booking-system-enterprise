import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs'; // <--- NEW IMPORT
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatTabsModule // <--- ADDED HERE
  ],
  templateUrl: './hotel-detail.html',
  styleUrls: ['./hotel-detail.css']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | undefined;
  rooms: Room[] = [];
  isLoading: boolean = true;      
  errorMessage: string = '';      

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid Hotel ID';
      this.isLoading = false;
      return;
    }

    this.hotelService.getHotelById(id).subscribe({
      next: (data: Hotel) => {
        this.hotel = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load hotel details.';
        this.isLoading = false;
      }
    });

    this.hotelService.getRoomsByHotelId(id).subscribe({
      next: (data: Room[]) => {
        this.rooms = data;
      },
      error: (err) => console.error('Error fetching rooms:', err)
    });
  }
}