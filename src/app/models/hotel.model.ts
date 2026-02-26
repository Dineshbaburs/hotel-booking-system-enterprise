export interface Hotel {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  description: string;
  thumbnail: string;
  images: string[];
  amenities: string[];
}