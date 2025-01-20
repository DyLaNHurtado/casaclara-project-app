import axios from 'axios';
import logger from '../utils/logger';

export class GeocodingService {
  private static readonly BASE_URL = 'https://nominatim.openstreetmap.org/search';

  static async getCoordinates(ubicacion: string): Promise<{ lat: number; lng: number }> {
    try {
      const response = await axios.get<{ lat: string; lon: string }[]>(this.BASE_URL, {
        params: {
          q: ubicacion,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'CasaClara/1.0'
        }
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }
    } catch (error) {
      logger.error('Error getting coordinates:', error);
    }
    return { lat: 0, lng: 0 };
  }
}
