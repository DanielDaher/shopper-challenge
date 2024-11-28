export interface RouteRequest {
  origin: LocationDetails;
  destination: LocationDetails;
  travelMode: 'drive' | 'walk' | 'bicycle' | 'transit' | 'DRIVE';
  routingPreference: 'traffic_unaware' | 'traffic_aware' | 'traffic_optimized' | 'TRAFFIC_UNAWARE';
  polylineQuality: 'overview' | 'high_quality';
  computeAlternativeRoutes: boolean;
  routeModifiers: RouteModifiers;
}

interface LocationDetails {
  vehicleStopover: boolean;
  sideOfRoad: boolean;
  address: string;
}

interface RouteModifiers {
  avoidTolls: boolean;
  avoidHighways: boolean;
  avoidFerries: boolean;
  avoidIndoor: boolean;
}
