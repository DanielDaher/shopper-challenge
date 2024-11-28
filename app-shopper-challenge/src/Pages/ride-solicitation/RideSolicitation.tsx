import api from "../../API";
import Form from "../../Components/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMap from "../../Components/GoogleMap";
import AvailableDrivers from "../../Components/AvailableDrivers";
import { EstimateRide } from "../../interfaces/estimate.ride.interface";

function RideSolicitation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [originAddress, setOriginAddress] = useState<string | null>(null);
  const [estimatedRide, setEstimatedRide] = useState<EstimateRide | null>(null);
  const [destinationnAddress, setDestinationAddress] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate('/history');
    }
  }, [navigate, redirect]);
  

  useEffect(() => {
    console.log('all states: ', {
      driverId, estimatedRide, customerId, originAddress, destinationnAddress
    })
    if (!driverId || !estimatedRide || !customerId || !originAddress || !destinationnAddress) return;

    const confirmRide = async () => {
    console.log('ride solicitation call:', true);
      const { distance, duration, options } = estimatedRide;
      const currentDriver = options.find((driver) => driver.id === driverId);

      if (!currentDriver) return;

      const formattedData = {
        customerId,
        origin: originAddress,
        destination: destinationnAddress,
        distance,
        duration,
        driver: { id: driverId, name: currentDriver.name},
        value: currentDriver.value,
      };

      const response = await api.patch('/ride/confirm', formattedData);
      const sucessfulResponse = 201;
  
      if (response.status === sucessfulResponse) {
        setRedirect(true);
      }
    }

    confirmRide();
  }, [customerId, driverId, estimatedRide, originAddress, destinationnAddress]);

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
      {!estimatedRide &&
        <Form
          setEstimatedRide={setEstimatedRide}
          setIsLoading={setIsLoading}
          setCustomerId={setCustomerId}
          setOriginAddress={setOriginAddress}
          setDestinationAddress={setDestinationAddress}
        />
      }
      {estimatedRide && (
        <div className={"grid md:grid-cols-[4fr_6fr]"}>
          <div>
            <AvailableDrivers drivers={estimatedRide.options} setDriverId={setDriverId} />
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
