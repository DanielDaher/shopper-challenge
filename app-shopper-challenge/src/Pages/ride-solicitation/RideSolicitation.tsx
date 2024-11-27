import Form from "../../Components/Form";
import { useEffect, useState } from "react";
import GoogleMap from "../../Components/GoogleMap";
import { EstimateRide } from "../../interfaces/estimate.ride.interface";

function RideSolicitation() {
  const [estimatedRide, setEstimatedRide] = useState<EstimateRide | null>(null);

  useEffect(() => { console.log(estimatedRide) }, [estimatedRide])
  return (
    <div>
      { !estimatedRide && <Form setEstimatedRide={setEstimatedRide}/>}
      { estimatedRide && <GoogleMap estimatedRide={estimatedRide} />}
      {/* { estimatedRide && <AvailableDrivers drivers={estimatedRide.options} />} */}
    </div>
  );
}

export default RideSolicitation;
