"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      const res = await fetch("/api/animals");
      const data = await res.json();
      setAnimals(data);
    }
    fetchAnimals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-indigo-800 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Live Temperature Dashboard</h1>
      </header>
      <main className="p-6 flex-grow">
        <h2 className="text-xl mb-4">Select an Animal:</h2>
        <div className="space-y-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => router.push(`/animal/${animal.id}`)}
              className="cursor-pointer hover:bg-indigo-700 p-4 rounded-lg border-2 border-indigo-500"
            >
              <h3 className="text-2xl">{animal.name}</h3>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-center text-sm p-4">
        &copy; 2025 Animal Temperatures. All rights reserved.
      </footer>
    </div>
  );
}
