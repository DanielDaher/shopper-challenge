import api from "../API";
import Directions from "./Directions";
import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { EstimateRide } from "../interfaces/estimate.ride.interface";

interface FormProps {
  estimatedRide: EstimateRide | null;
}

const GoogleMap: React.FC<FormProps> = (props) => {
  const { estimatedRide } = props;
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (apiKey.length) return;

    const getApiKey = async () => {
      const response = await api.get('/api-key');
      setApiKey(response.data.apiKey);
    };

    getApiKey();
  }, [apiKey]);

  if (!estimatedRide) return (
    <p>Loading...</p>
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      { apiKey && <APIProvider apiKey={apiKey}>
        <Directions estimatedRide={estimatedRide} />
        <Map
          center={{
            lat: estimatedRide.origin.latitude,
            lng: estimatedRide.origin.longitude,
          }}
          zoom={9}
          fullscreenControl={false}
        >
        </Map>
      </APIProvider> }
    </div>
  );
}

export default GoogleMap;