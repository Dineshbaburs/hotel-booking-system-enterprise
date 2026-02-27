import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { HotelListComponent } from './components/hotel-list/hotel-list';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  /* =========================
     1️⃣ Public Routes
  ========================== */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* =========================
     2️⃣ Default Route
  ========================== */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /* =========================
     3️⃣ Protected Routes
  ========================== */
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'hotels',
    component: HotelListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'hotels/:id',
    component: HotelDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'book/:roomId',
    component: BookingFormComponent,
    canActivate: [authGuard]
  },

  /* 🔥 IMPORTANT ROUTE */
  {
    path: 'confirmation/:id',
    component: BookingConfirmationComponent,
    canActivate: [authGuard]
  },

  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard]
  },

  /* =========================
     4️⃣ Admin Route
  ========================== */
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [authGuard]
  },

  /* =========================
     5️⃣ 404 Route (MUST BE LAST)
  ========================== */
  {
    path: '**',
    component: PageNotFoundComponent
  }
];