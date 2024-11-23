interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Review {
  rating: number;
  comment: string;
}

interface Option {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

export interface EstimateRideResponse {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Option[];
  routeResponse: Record<string, any>;
}
