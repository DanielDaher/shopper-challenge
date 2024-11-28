import React from 'react';
import { EstimateRide } from '../interfaces/estimate.ride.interface';
import AvailableDriversStyles from '../TailwindStyles/Available.drivers';

interface AvailableDriversProps {
  drivers: EstimateRide["options"];
  setDriverId: (id: number) => void;
}

const AvailableDrivers: React.FC<AvailableDriversProps> = ({ drivers, setDriverId }) => {
  const { listClasses, textClasses, noDriversClasses, valueClasses, titleClasses, headerClasses, containerClasses, itemClasses, submitButton  } = AvailableDriversStyles

  const confirmRide = (driverId: number) => {
    setDriverId(driverId);
  };

  const showDriverInfo = (
    keyValue: number,
    label: string,
    value: string | number,
    isValueField?: boolean
  ) => {
    return (
      <p
        key={keyValue}
        className={isValueField ? valueClasses : textClasses}
      >
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <div className={containerClasses}>
      <h2 className={headerClasses}>Motoristas Disponíveis</h2>
      {
        drivers.length > 0 ? (
          <ul className={listClasses}>
            {
              drivers.map((driver, index) => {
                const driverDetails = [
                  { label: "Descrição", value: driver.description },
                  { label: "Veículo", value: driver.vehicle },
                  { label: "Avaliação", value: driver.review.rating + " / 5" },
                  { label: "Valor da Viagem", value: `R$ ${driver.value.toFixed(2)}`, isValueField: true },
                ];

                return (
                  <li
                    key={index}
                    className={itemClasses}
                  >
                    <h3 className={titleClasses}>{ driver.name }</h3>
                    {
                      driverDetails.map((detail, idx) => showDriverInfo(idx, detail.label, detail.value, detail.isValueField))
                    }
                    <button
                      onClick={ () => confirmRide(driver.id) }
                      className={submitButton}
                      >
                        Escolher
                    </button>
                  </li>
                );
              })
            }
        </ul>
      ) : (
        <p className={noDriversClasses}>Não há motoristas disponíveis no momento.</p>
      )}
    </div>
  );
};

export default AvailableDrivers;
