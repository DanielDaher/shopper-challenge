import React from 'react';
import { EstimateRide } from '../interfaces/estimate.ride.interface';

interface AvailableDriversProps {
  drivers: EstimateRide["options"];
}

const AvailableDrivers: React.FC<AvailableDriversProps> = ({ drivers }) => {
  const listClasses = "space-y-4";
  const textClasses = "text-gray-600 mt-2";
  const noDriversClasses = "text-gray-500";
  const valueClasses = "text-gray-900 mt-2 font-semibold";
  const titleClasses = "text-xl font-semibold text-gray-900";
  const headerClasses = "text-3xl font-semibold text-gray-800 mb-6";
  const containerClasses = "p-6 px-20 ml-5 text-center bg-white rounded-lg shadow-md max-w-4xl mx-auto";
  const itemClasses = "p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200";

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
