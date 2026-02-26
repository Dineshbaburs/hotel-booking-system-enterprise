import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  selectedLocation: string = '';
  
  // List of Cities (Matches your Requirement)
  locations: string[] = ['Bengaluru', 'Mumbai', 'Delhi', 'Goa', 'Chennai', 'Salem'];

  constructor(private router: Router) {}

  onSearch() {
    if (this.selectedLocation) {
      this.router.navigate(['/hotels'], { queryParams: { location: this.selectedLocation } });
    }
  }
}