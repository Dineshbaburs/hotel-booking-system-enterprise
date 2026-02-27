// FIXED: Component is imported from @angular/core, not @angular/common
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  // FIXED: Added MatIconModule to fix the "mat-icon is not a known element" error
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './page-not-found.html',
  styleUrls: ['./page-not-found.css']
})
export class PageNotFoundComponent {}