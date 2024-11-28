import { useEffect, useState } from "react";
import api from "../../API";
import HistoryStyles from "../../TailwindStyles/HistoryStyles";

function HistoryRides() {
  const [userId, setUserId] = useState<number | null>(null);
  const [driverId, setDriverId] = useState<number | string>("all");
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
          driver_id: driverId === "all" ? undefined : driverId,
        },
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
    <div className={HistoryStyles.container}>
      <div className={HistoryStyles.innerContainer}>
        <h1 className={HistoryStyles.title}>Histórico de Viagens</h1>

        <div className={HistoryStyles.formContainer}>
          <div className={HistoryStyles.formGroup}>
            <label htmlFor="userId" className={HistoryStyles.label}>
              ID do cliente:
            </label>
            <input
              type="number"
              id="userId"
              className={HistoryStyles.input}
              value={userId || ""}
              onChange={(e) => setUserId(Number(e.target.value))}
            />
          </div>

          <div className={HistoryStyles.formGroup}>
            <label htmlFor="driverId" className={HistoryStyles.label}>
              Selecionar motorista:
            </label>
            <select
              id="driverId"
              className={HistoryStyles.select}
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="1">Homer Simpson</option>
              <option value="2">Dominic Toretto</option>
              <option value="3">James Bond</option>
            </select>
          </div>

          <button onClick={applyFilter} className={HistoryStyles.button}>
            Buscar
          </button>
        </div>

        {loading ? (
          <div className={HistoryStyles.loading}>Carregando...</div>
        ) : (
          <div className={HistoryStyles.ridesList}>
            {rides.length > 0 ? (
              <ul>
                {rides.map((ride, index) => (
                  <li key={index} className={HistoryStyles.rideCard}>
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
              <p className={HistoryStyles.noRides}>Nenhuma viagem encontrada.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryRides;
