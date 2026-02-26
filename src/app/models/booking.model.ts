export interface Booking {
  id?: string | number; // <--- CHANGED: Allow string IDs
  roomId: number;
  guestName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
}