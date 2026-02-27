import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './services/loading.service'; 
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, NavbarComponent],
  template: `
    <mat-progress-bar 
      *ngIf="loadingService.loadingStatus | async" 
      mode="indeterminate" 
      color="accent" 
      style="position: fixed; top: 0; left: 0; z-index: 2000; height: 4px;">
    </mat-progress-bar>

    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
}