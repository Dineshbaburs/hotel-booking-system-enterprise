import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './room-form-dialog.html',
  styleUrls: ['./room-form-dialog.css']
})
export class RoomFormDialogComponent {
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the Reactive Form
    this.roomForm = this.fb.group({
      hotelId: [1, Validators.required], // Defaulting to Hotel ID 1 for simplicity
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(100)]],
      maxGuests: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      features: ['', Validators.required], // User will enter comma-separated values
      isAvailable: [true]
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Closes dialog without saving
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const formValue = this.roomForm.value;
      
      // Convert the comma-separated string into an array of strings
      const newRoom = {
        ...formValue,
        features: formValue.features.split(',').map((f: string) => f.trim())
      };
      
      // Close the dialog and pass the new room data back to the admin panel
      this.dialogRef.close(newRoom);
    }
  }
}