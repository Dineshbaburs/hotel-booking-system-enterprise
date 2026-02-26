import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingForm } from './booking-form';

describe('BookingForm', () => {
  let component: BookingForm;
  let fixture: ComponentFixture<BookingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
