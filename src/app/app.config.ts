import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // <--- This needs 'zone.js'
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])), // <--- UPDATED WITH INTERCEPTOR
    provideAnimationsAsync()
  ]
};