"use client";
import React from 'react';
import TemperatureDashboard from "../components/TemperatureDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-indigo-800 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Live Temperature Dashboard</h1>
      </header>
      <main className="p-6 flex-grow">
        <TemperatureDashboard />
      </main>
      <footer className="bg-gray-800 text-center text-sm p-4">
        &copy; 2025 Animal Temperatures. All rights reserved.
      </footer>
    </div>
  );
}
