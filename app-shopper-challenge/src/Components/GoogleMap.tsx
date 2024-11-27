"use client";

import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import api from "../API";

function GoogleMap() {
  const position = { lat: -19.9160959, lng: -43.933045 };
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (apiKey.length) return;

    const getApiKey = async () => {
      const response = await api.get('/api-key');
      setApiKey(response.data.apiKey);
    };

    getApiKey();
  }, [apiKey]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      { apiKey && <APIProvider apiKey={apiKey}>
        <Map
          center={position}
          zoom={9}
          // mapId={process.env.REACT_APP_MAP_ID}
          fullscreenControl={false}
        >
        </Map>
        <Directions />
      </APIProvider> }
    </div>
  );
}

const Directions: React.FC = () => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    // const teste = new routesLibrary.DirectionsService();
    const teste = new routesLibrary.DirectionsRenderer({ map });
    console.log('teste: ', teste);
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "Colégio Nossa Senhora das Dores - Avenida Francisco Sales - Floresta, Belo Horizonte - MG, Brasil",
        destination: "Colégio Batista - Rua Pte. Nova - Floresta, Belo Horizonte - MG, Brasil",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleMap;