import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = 0;
  loadingStatus = new BehaviorSubject<boolean>(false);

  show() {
    this.activeRequests++;
    this.loadingStatus.next(true);
  }

  hide() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.loadingStatus.next(false);
    }
  }
}