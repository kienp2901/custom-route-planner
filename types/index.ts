export interface RouteLeg {
  from: string;
  to: string;
  distance_km: number;
  duration_min: number;
}

export interface RouteResponse {
  routes: RouteLeg[];
  total_distance_km: number;
  total_duration_min: number;
  map_polyline: string;
}

export interface RouteRequest {
  destinations: string[];
  mode: 'driving' | 'walking';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
