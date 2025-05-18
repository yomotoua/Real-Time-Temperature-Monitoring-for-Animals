"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import TemperatureChart from "../../components/TemperatureChart";

type Alert = { animal: string; temperature: number };

export default function TemperatureDashboard() {
  const params = useParams<{ animalId: string }>(); // Explicitly specify animalId type
  const animalId = params?.animalId; // Safely access animalId

  const [temps, setTemps] = useState<number[]>([]); // State to hold temperature values
  const [alerts, setAlerts] = useState<Alert[]>([]); // State to hold alerts

  useEffect(() => {
    if (!animalId) return; // Ensure animalId exists

    async function fetchData() {
      // Fetch temperature data for this animal from the backend API
     const res = await fetch(`http://127.0.0.1:8000/api/temperatures/${animalId}`);
      const data = await res.json();

      // Ensure data is an array, and set the temperature data
      if (Array.isArray(data)) {
        setTemps(data.map((r: any) => r.temperature)); // Set the temperature data as an array
      } else {
        console.error("Fetched data is not an array:", data);
      }
    }

    fetchData();

    const iv = setInterval(fetchData, 2000); // Fetch data every 2 seconds
    return () => clearInterval(iv); // Cleanup interval on unmount
  }, [animalId]);

  useEffect(() => {
    const alertRes = fetch("/api/alerts");
    alertRes
      .then((response) => response.json())
      .then((alertData) => setAlerts(alertData));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-indigo-800 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Real-Time Temperature for Animal {animalId}
        </h1>
      </header>
      <main className="p-6 flex-grow">
        {/* Pass the data as an array of temperatures */}
        <TemperatureChart data={temps} />

        {alerts.length > 0 && (
          <div className="bg-red-500 text-white p-3 mt-4 rounded-lg">
            <h2 className="text-xl mb-2">Alerts:</h2>
            <ul className="list-disc list-inside">
              {alerts.map((a, i) => (
                <li key={i}>
                  {a.animal}: {a.temperature}°C
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-center text-sm p-4">
        &copy; 2025 Animal Temperatures. All rights reserved.
      </footer>
    </div>
  );
}
