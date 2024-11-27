import React, { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { EstimateRide } from "../interfaces/estimate.ride.interface";

interface FormProps {
  estimatedRide: EstimateRide | null;
}

const Directions: React.FC<FormProps> = (props) => {
  const map = useMap();
  const { estimatedRide } = props;

  const [routeIndex] = useState(0);
  const routesLibrary = useMapsLibrary("routes");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !estimatedRide) return;
    const origin = { lat: estimatedRide.origin.latitude, lng: estimatedRide.origin.longitude };
    const destination = { lat: estimatedRide.destination.latitude, lng: estimatedRide.destination.longitude };

    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        console.log('direction service route: ', response);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, estimatedRide]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  return (
    <div>
      <h2>Rota da viagem:</h2>
    </div>
  );
}

export default Directions;