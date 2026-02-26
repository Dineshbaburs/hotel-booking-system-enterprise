import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the SnackBar service to show notifications
  const snackBar = inject(MatSnackBar);

  // Pass the request forward, but "catch" any errors that come back
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        // Backend API error (e.g., JSON Server is offline)
        if (error.status === 0) {
          errorMessage = 'Server is offline. Please start the mock backend (npm run mock:api).';
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      // Display the error globally using MatSnackBar
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Log it for API Request Tracking
      console.error('HTTP Interceptor Caught an Error:', error);

      // Re-throw the error so individual components can still handle it if they want
      return throwError(() => new Error(errorMessage));
    })
  );
};