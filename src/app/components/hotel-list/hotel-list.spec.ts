import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelList } from './hotel-list';

describe('HotelList', () => {
  let component: HotelList;
  let fixture: ComponentFixture<HotelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
