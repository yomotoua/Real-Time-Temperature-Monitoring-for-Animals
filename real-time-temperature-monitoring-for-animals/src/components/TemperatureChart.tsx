// TemperatureChart.tsx
"use client";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

// Define prop types explicitly
interface TemperatureChartProps {
  data: number[];  // Array of temperatures
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.labels = data.map((_, i) => i * 2); // 2-second intervals
        chartInstanceRef.current.data.datasets[0].data = data;
        chartInstanceRef.current.update();
      } else {
        chartInstanceRef.current = new Chart(ctx!, {
          type: "line",
          data: {
            labels: data.map((_, i) => i * 2), // 2-second intervals
            datasets: [
              {
                label: "Temperature",
                data: data,
                borderColor: "#60a5fa",
                backgroundColor: "rgba(96, 165, 250, 0.2)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Temperature History",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time (s)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Temperature (°C)",
                },
                min: 35,
                max: 40,
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div className="relative h-[500px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
