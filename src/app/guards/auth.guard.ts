import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (authService.getCurrentUserValue()) {
    return true; // Allowed
  } else {
    // Not logged in? Redirect to Login
    router.navigate(['/login']);
    return false;
  }
};