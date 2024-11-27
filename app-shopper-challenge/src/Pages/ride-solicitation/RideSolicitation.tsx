import Form from "../../Components/Form";
import { useEffect, useState } from "react";
import GoogleMap from "../../Components/GoogleMap";
import { EstimateRide } from "../../interfaces/estimate.ride.interface";
import AvailableDrivers from "../../Components/AvailableDrivers";

function RideSolicitation() {
  const [estimatedRide, setEstimatedRide] = useState<EstimateRide | null>(null);

  useEffect(() => { console.log(estimatedRide) }, [estimatedRide])
  return (
    <div>
      { !estimatedRide && <Form setEstimatedRide={setEstimatedRide}/>}
      { estimatedRide && <AvailableDrivers drivers={estimatedRide.options} />}
      { estimatedRide && <GoogleMap estimatedRide={estimatedRide} />}
    </div>
  );
}

export default RideSolicitation;
