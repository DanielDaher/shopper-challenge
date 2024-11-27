import Form from "../../Components/Form";
import { useState } from "react";
import GoogleMap from "../../Components/GoogleMap";
import { EstimateRide } from "../../interfaces/estimate.ride.interface";
import AvailableDrivers from "../../Components/AvailableDrivers";

function RideSolicitation() {
  const [estimatedRide, setEstimatedRide] = useState<EstimateRide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        >
          Carregando...
      </div>
    );
  }

  return (
    <div className="p-4">
      {!estimatedRide && <Form setEstimatedRide={setEstimatedRide} setIsLoading={setIsLoading} />}
      {estimatedRide && (
        <div className={"grid md:grid-cols-[4fr_6fr]"}>
          <div>
            <AvailableDrivers drivers={estimatedRide.options} />
          </div>
          <div>
            <GoogleMap estimatedRide={estimatedRide} />
          </div>
        </div>
      )}
    </div>
  );
}

export default RideSolicitation;
