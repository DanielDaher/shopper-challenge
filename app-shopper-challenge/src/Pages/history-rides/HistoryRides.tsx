import { useEffect, useState } from "react";
import api from "../../API";

function HistoryRides() {
  const [userId, setUserId] = useState<number | null>(null);
  const [driverId, setDriverId] = useState<number | string>( "all");
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("history rides");
  }, []);

  const loadRides = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await api.get(`/ride/${userId}`, {
        params: {
          // customer_id: userId,
          driver_id: driverId === "all" ? undefined : driverId
        }
      });

      setRides(response.data.rides);
    } catch (error) {
      console.error("Erro ao carregar as viagens", error);
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    loadRides();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Histórico de Viagens</h1>

      <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          ID do Usuário
        </label>
        <input
          type="number"
          id="userId"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={userId || ""}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="driverId" className="block text-sm font-medium text-gray-700">
          Seletor de Motorista
        </label>
        <select
          id="driverId"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="1">Homer Simpson</option>
          <option value="2">Dominic Toretto</option>
          <option value="3">James Bond</option>
        </select>
      </div>

      <button
        onClick={applyFilter}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Buscar
      </button>

      {loading ? (
        <div className="flex justify-center items-center mt-6">
          Carregando...
        </div>
      ) : (
        <div className="mt-6">
          {rides.length > 0 ? (
            <ul className="space-y-4">
              {rides.map((ride, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                >
                  <div>
                    <strong>Data e Hora:</strong> {new Date(ride.date).toLocaleString()}
                  </div>
                  <div>
                    <strong>Motorista:</strong> {ride.driver.name}
                  </div>
                  <div>
                    <strong>Origem:</strong> {ride.origin}
                  </div>
                  <div>
                    <strong>Destino:</strong> {ride.destination}
                  </div>
                  <div>
                    <strong>Distância:</strong> {ride.distance} km
                  </div>
                  <div>
                    <strong>Tempo:</strong> {ride.duration} minutos
                  </div>
                  <div>
                    <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhuma viagem encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HistoryRides;
