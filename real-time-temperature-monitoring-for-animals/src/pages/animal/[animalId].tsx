import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TemperatureChart from "../../components/TemperatureChart";

type Alert = {
  animal: string;
  temperature: number;
};

export default function AnimalProfilePage() {
  const router = useRouter();
  const { animalId } = router.query;

  const [temps, setTemps] = useState<number[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Fetch temperature history for this animal
  useEffect(() => {
    if (!animalId || typeof animalId !== "string") return;

    async function fetchData() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/temperatures/${animalId}`);
        if (!res.ok) throw new Error("Failed to fetch temperature data");
        const data = await res.json();
        const values = data.map((entry: any) => entry.temperature);
        setTemps(values); 

      } catch (err) {
        console.error("Error fetching temperature history:", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [animalId]);

  // Fetch alerts (and filter for this animal)
  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    }

    fetchAlerts();
  }, []);

  if (!animalId || typeof animalId !== "string") {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-indigo-800 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center capitalize">
          Temperature Profile: {animalId}
        </h1>
      </header>

      <main className="p-6">
        {temps.length > 0 ? (
          <>
            <TemperatureChart data={{ [animalId]: temps }} />
            <p className="mt-4 text-lg">
              Latest Temperature: {temps[temps.length - 1]}°C
            </p>
          </>
        ) : (
          <p className="text-gray-400 mt-6">No temperature data available.</p>
        )}

        {alerts.length > 0 && (
          <div className="bg-red-600 text-white p-3 mt-6 rounded">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <ul className="list-disc list-inside">
              {alerts
                .filter((a) => a.animal.toLowerCase() === animalId.toLowerCase())
                .map((a, i) => (
                  <li key={i}>
                    {a.animal}: {a.temperature}°C
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
