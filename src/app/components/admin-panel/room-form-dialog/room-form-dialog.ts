import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <-- Needed for dropdown

@Component({
  selector: 'app-room-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule // <-- Needed for dropdown
  ],
  templateUrl: './room-form-dialog.html',
  styleUrls: ['./room-form-dialog.css']
})
export class RoomFormDialogComponent {
  roomForm: FormGroup;
  hotels: any[] = []; // Array to catch the hotels passed from Admin Panel

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Get the hotels array from the dialog data
    this.hotels = data?.hotels || [];

    // Initialize the Reactive Form with ALL proper fields (including hotelId and roomNumber)
    this.roomForm = this.fb.group({
      hotelId: ['', Validators.required],
      roomNumber: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(100)]],
      maxGuests: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      features: ['', Validators.required], 
      isAvailable: [true]
    });
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const formValue = this.roomForm.value;
      
      const newRoom = {
        ...formValue,
        hotelId: Number(formValue.hotelId), // Ensure ID is saved as a number
        features: formValue.features.split(',').map((f: string) => f.trim())
      };
      
      this.dialogRef.close(newRoom);
    }
  }
}