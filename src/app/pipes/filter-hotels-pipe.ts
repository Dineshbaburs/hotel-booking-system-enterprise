import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'filterHotels',
  standalone: true
})
export class FilterHotelsPipe implements PipeTransform {
  transform(hotels: Hotel[], searchTerm: string, maxPrice: number | null, minRating: number): Hotel[] {
    if (!hotels) return [];
    
    return hotels.filter(hotel => {
      const matchesLocation = !searchTerm || 
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = !maxPrice || hotel.pricePerNight <= maxPrice;
      const matchesRating = !minRating || hotel.rating >= minRating;

      return matchesLocation && matchesPrice && matchesRating;
    });
  }
}