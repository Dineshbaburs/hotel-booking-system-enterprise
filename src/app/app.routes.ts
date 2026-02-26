import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { HotelListComponent } from './components/hotel-list/hotel-list';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';
import { authGuard } from './guards/auth.guard'; // <--- Import Guard

export const routes: Routes = [
  // 1. Public Routes (No Guard)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // 2. Default Redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 3. Protected Routes (Locked by authGuard)
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'hotels', component: HotelListComponent, canActivate: [authGuard] },
  { path: 'hotels/:id', component: HotelDetailComponent, canActivate: [authGuard] },
  { path: 'book/:roomId', component: BookingFormComponent, canActivate: [authGuard] },
  { path: 'confirmation/:id', component: BookingConfirmationComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] }
];