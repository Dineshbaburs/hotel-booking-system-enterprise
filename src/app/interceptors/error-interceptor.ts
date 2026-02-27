import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service'; 
import { catchError, finalize, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const loadingService = inject(LoadingService); 

  loadingService.show(); 

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.status === 0) {
        errorMessage = 'Server is offline. Please start the mock backend.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return throwError(() => new Error(errorMessage));
    }),
    finalize(() => {
      loadingService.hide(); 
    })
  );
};