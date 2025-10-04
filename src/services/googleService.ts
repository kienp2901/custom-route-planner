import axios from 'axios';

interface GeocodingResult {
  lat: number;
  lng: number;
  address: string;
}

interface RouteLeg {
  from: string;
  to: string;
  distance_km: number;
  duration_min: number;
}

interface RouteResponse {
  routes: RouteLeg[];
  total_distance_km: number;
  total_duration_min: number;
  map_polyline: string;
}

class GoogleService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY is required');
    }
  }

  /**
   * Geocode an address to get latitude and longitude
   */
  async geocodeAddress(address: string): Promise<GeocodingResult> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: this.apiKey
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Geocoding failed: ${response.data.status}`);
      }

      const result = response.data.results[0];
      const location = result.geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
        address: result.formatted_address
      };
    } catch (error) {
      throw new Error(`Failed to geocode address "${address}": ${error}`);
    }
  }

  /**
   * Get route directions between multiple waypoints
   */
  async getRoute(destinations: string[], mode: 'driving' | 'walking'): Promise<RouteResponse> {
    try {
      // First, geocode all destinations
      const geocodedDestinations = await Promise.all(
        destinations.map(dest => this.geocodeAddress(dest))
      );

      // Build waypoints string (exclude first and last as they are origin and destination)
      const waypoints = geocodedDestinations.slice(1, -1)
        .map(dest => `${dest.lat},${dest.lng}`)
        .join('|');

      const origin = `${geocodedDestinations[0].lat},${geocodedDestinations[0].lng}`;
      const destination = `${geocodedDestinations[geocodedDestinations.length - 1].lat},${geocodedDestinations[geocodedDestinations.length - 1].lng}`;

      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          mode: mode,
          key: this.apiKey
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Directions API failed: ${response.data.status}`);
      }

      const route = response.data.routes[0];
      const legs = route.legs;

      // Process route legs
      const processedRoutes: RouteLeg[] = legs.map((leg: any, index: number) => ({
        from: destinations[index],
        to: destinations[index + 1],
        distance_km: leg.distance.value / 1000, // Convert meters to kilometers
        duration_min: leg.duration.value / 60 // Convert seconds to minutes
      }));

      // Calculate totals
      const total_distance_km = processedRoutes.reduce((sum, leg) => sum + leg.distance_km, 0);
      const total_duration_min = processedRoutes.reduce((sum, leg) => sum + leg.duration_min, 0);

      return {
        routes: processedRoutes,
        total_distance_km: Math.round(total_distance_km * 100) / 100,
        total_duration_min: Math.round(total_duration_min),
        map_polyline: route.overview_polyline.points
      };
    } catch (error) {
      throw new Error(`Failed to get route: ${error}`);
    }
  }
}

export default GoogleService;
