import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Required for mat-form-field
import { MatInputModule } from '@angular/material/input'; // Required for matInput
import { MatSelectModule } from '@angular/material/select'; // Required for mat-select
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
// Notice the dashes and exact file names matching your CLI output!
import { FilterHotelsPipe } from '../../pipes/filter-hotels-pipe'; 
import { StatusHighlightDirective } from '../../directives/status-highlight';
@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, // Added for filtering
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule, // Added for UI components
    MatInputModule, // Added for UI components
    MatSelectModule, // Added for UI components
    FilterHotelsPipe, // Added custom pipe
    StatusHighlightDirective // Added custom directive
  ],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  // NEW: Filter properties bound to the template
  searchText: string = '';
  maxPrice: number | null = null;
  minRating: number = 0;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Combined logic: listen for URL params and load initial data
    this.route.queryParams.subscribe(params => {
      const location = params['location'];
      if (location) {
        this.searchText = location;
      }
      
      this.hotelService.getHotels(location).subscribe(data => {
        this.hotels = data;
      });
    });
  }
}