// src/app/about/page.tsx

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="font-sans p-5 pb-10 bg-gray-800 text-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">

      <div>
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>

        <p className="mb-6">
          This web application monitors animal body temperature in real time. It simulates sensor data
          and visualizes it using charts and alerts
                  

        </p>
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside mb-6 text-sm space-y-1">
          <li>Real-time temperature dashboard with Chart.js</li>
          <li>Automatic fever detection and alerts</li>
          <li>Animal-specific data tracking</li>
          <li>Django REST backend</li>
          <li>Next.js + TypeScript frontend</li>
        </ul>

      </div>

      <footer className="mt-12 text-center text-sm text-gray-400">
        Project by Țînțăreanu-Mircea Mihai Cezar · Kucherenko Illia · Kiselar Vladyslav · Basiuk Yelyzaveta
      </footer>
    </div>
  );
}
