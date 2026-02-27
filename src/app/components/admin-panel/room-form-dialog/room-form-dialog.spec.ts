import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFormDialog } from './room-form-dialog';

describe('RoomFormDialog', () => {
  let component: RoomFormDialog;
  let fixture: ComponentFixture<RoomFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
