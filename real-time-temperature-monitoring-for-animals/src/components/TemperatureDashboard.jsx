"use client";
import React, { useState, useEffect } from "react";
import TemperatureChart from "./TemperatureChart";

const maxPoints = 20;

export default function TemperatureDashboard() {
  const [animals, setAnimals] = useState([]);
  const [temperatures, setTemperatures] = useState({});
  const [history, setHistory] = useState({});
  const [visibleAlert, setVisibleAlert] = useState(null);
  const [latestAlertId, setLatestAlertId] = useState(null);

  useEffect(() => {
    async function fetchAnimalList() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/animals");
        const data = await res.json();

        if (Array.isArray(data)) {
          setAnimals(data);

          const tempInit = {};
          const histInit = {};
          data.forEach((animal) => {
            const name = typeof animal === "string" ? animal : animal.name;
            tempInit[name] = 0;
            histInit[name] = [];
          });

          setTemperatures(tempInit);
          setHistory(histInit);
        } else {
          console.error("Animal list is not an array:", data);
        }
      } catch (err) {
        console.error("Failed to fetch animals", err);
      }
    }

    fetchAnimalList();
  }, []);

  useEffect(() => {
    if (animals.length === 0) return;

    async function fetchData() {
      try {
        const resTemps = await fetch("http://127.0.0.1:8000/api/temperatures");
        const tempData = await resTemps.json();

        const newTemps = { ...temperatures };
        const updatedHistory = { ...history };

        tempData.forEach((entry) => {
          const name = entry.animal;
          newTemps[name] = entry.temperature;
          updatedHistory[name] = [...(updatedHistory[name] || []), entry.temperature].slice(-maxPoints);
        });

        setTemperatures(newTemps);
        setHistory(updatedHistory);

        const resAlerts = await fetch("http://127.0.0.1:8000/api/alerts/");
        const alertData = await resAlerts.json();

        if (alertData.length > 0) {
          const newestAlert = alertData[0];
          const newAlertId = `${newestAlert.animal}-${newestAlert.created_at}`;

          if (newAlertId !== latestAlertId) {
            setLatestAlertId(newAlertId);
            setVisibleAlert({
              id: newAlertId,
              message: `⚠️ Alert: ${newestAlert.animal} at ${newestAlert.created_at} → ${newestAlert.temperature}°C`
            });

            setTimeout(() => setVisibleAlert(null), 3000);
          }
        }

      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [animals, latestAlertId]);

  return (
    <div className="font-sans p-5 pb-10 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Animal Temperature Dashboard</h1>

      {visibleAlert && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm flex items-center gap-2">
            <span>{visibleAlert.message}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="md:w-1/4 w-full max-w-[250px]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Animal</th>
                <th className="border border-gray-600 p-2">Temp (°C)</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animalObj) => {
                const name = typeof animalObj === "string" ? animalObj : animalObj.name;
                return (
                  <tr key={name}>
                    <td className="border border-gray-600 p-2 capitalize">{name}</td>
                    <td className="border border-gray-600 p-2">
                      {temperatures[name] ?? "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="md:w-3/4 w-full flex-1">
          <TemperatureChart data={history} />
        </div>
      </div>
    </div>
  );
}
