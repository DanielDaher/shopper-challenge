export interface ComputeRouteResponse {
  routes: Route[];
}

interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: EncodedPolyline;
  description: string;
  viewport: {
    low: {
      latitude: number;
      longitude: number;
    };
    high: {
      latitude: number;
      longitude: number;
    };
  }
  travelAdvisory: any;
  localizedValues: {
    distance: { text: string };
    duration: { text: string };
    staticDuration: { text: string };
    routeLabels: string[];
  }
}

interface Leg {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: EncodedPolyline;
  startLocation: Location;
  endLocation: Location;
  steps: Step[];
}

interface EncodedPolyline {
  encodedPolyline: string;
}

interface Location {
  latLng: LatLng;
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Step {
  distanceMeters: number;
  staticDuration: string;
  polyline: EncodedPolyline;
  startLocation: Location;
  endLocation: Location;
  navigationInstruction: NavigationInstruction;
  localizedValues: LocalizedValues;
  travelMode: TravelMode;
}

interface NavigationInstruction {
  maneuver: string;
  instructions: string;
}

interface LocalizedValues {
  distance: LocalizedText;
  staticDuration: LocalizedText;
}

interface LocalizedText {
  text: string;
}

type TravelMode = 'DRIVE' | 'WALK' | 'BICYCLE' | 'TRANSIT';
