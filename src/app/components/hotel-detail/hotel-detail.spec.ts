import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { HotelDetailComponent } from './hotel-detail'; // <--- FIXED: Only import HotelDetailComponent

describe('HotelDetailComponent', () => {
  let component: HotelDetailComponent;
  let fixture: ComponentFixture<HotelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HotelDetailComponent, 
        HttpClientTestingModule, 
        RouterTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});