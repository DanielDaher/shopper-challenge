import Form from "../../Components/Form";
import { useState } from "react";
import GoogleMap from "../../Components/GoogleMap";
import { EstimateRide } from "../../interfaces/estimate.ride.interface";
import AvailableDrivers from "../../Components/AvailableDrivers";

function RideSolicitation() {
  const [estimatedRide, setEstimatedRide] = useState<EstimateRide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      { !estimatedRide && <Form setEstimatedRide={setEstimatedRide} setIsLoading={setIsLoading}/>}
      { estimatedRide && <AvailableDrivers drivers={estimatedRide.options} />}
      { estimatedRide && <GoogleMap estimatedRide={estimatedRide} />}
    </div>
  );
}

export default RideSolicitation;
