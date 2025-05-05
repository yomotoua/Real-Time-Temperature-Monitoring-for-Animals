"use client";
import React, { useState, useEffect } from 'react';
import TemperatureChart from "./TemperatureChart";

function getRandomTemperature(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

const initialData = {
  cow: getRandomTemperature(35, 40),
  dog: getRandomTemperature(37, 39),
  horse: getRandomTemperature(36, 38)
};

export default function TemperatureDashboard() {
  const [temperatures, setTemperatures] = useState(initialData);
  const [history, setHistory] = useState({
    cow: [initialData.cow],
    dog: [initialData.dog],
    horse: [initialData.horse]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemps = {
        cow: getRandomTemperature(35, 40),
        dog: getRandomTemperature(37, 39),
        horse: getRandomTemperature(36, 38)
      };
      setTemperatures(newTemps);
      setHistory(prev => ({
        cow: [...prev.cow, newTemps.cow].slice(-20),
        dog: [...prev.dog, newTemps.dog].slice(-20),
        horse: [...prev.horse, newTemps.horse].slice(-20)
      }));
    }, 2000); // update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans p-5 pb-10 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Animal Temperature Dashboard</h1>
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
              <tr>
                <td className="border border-gray-600 p-2">Cow</td>
                <td className="border border-gray-600 p-2">{temperatures.cow}</td>
              </tr>
              <tr>
                <td className="border border-gray-600 p-2">Dog</td>
                <td className="border border-gray-600 p-2">{temperatures.dog}</td>
              </tr>
              <tr>
                <td className="border border-gray-600 p-2">Horse</td>
                <td className="border border-gray-600 p-2">{temperatures.horse}</td>
              </tr>
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
