export interface Booking {
  id?: string;       // MUST be string
  roomId: string;    // MUST be string
  guestName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}