import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Added for Admin Cards
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

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
    MatIconModule, // Added for Admin Cards
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  selectedLocation: string = '';
  currentUser: User | null = null; // Track current user
  
  // List of Cities
  locations: string[] = ['Bengaluru', 'Mumbai', 'Delhi', 'Goa', 'Chennai', 'Salem'];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the current logged-in user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onSearch() {
    if (this.selectedLocation) {
      this.router.navigate(['/hotels'], { queryParams: { location: this.selectedLocation } });
    }
  }
}