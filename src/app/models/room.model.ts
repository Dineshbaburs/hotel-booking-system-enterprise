export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: 'Standard' | 'Deluxe' | 'Suite';
  price: number;
  isAvailable: boolean;
  maxGuests: number;
  features: string[];
}