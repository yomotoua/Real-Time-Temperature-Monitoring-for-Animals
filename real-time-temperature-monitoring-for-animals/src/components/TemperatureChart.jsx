"use client";
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

export default function TemperatureChart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Generate labels based on indices (each point represents 2 seconds)
    const labels = data.cow.map((_, i) => i * 2);

    // If chart instance already exists, update its data and labels
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = data.cow;
      chartInstanceRef.current.data.datasets[1].data = data.dog;
      chartInstanceRef.current.data.datasets[2].data = data.horse;
      // Update chart without animation to keep refresh smooth
      chartInstanceRef.current.update('none');
    } else {
      // Get the 2D drawing context from the canvas
      const ctx = chartRef.current.getContext('2d');

      // Create a new Chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Cow',
              data: data.cow,
              borderColor: '#f87171',
              backgroundColor: 'rgba(248, 113, 113, 0.2)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Dog',
              data: data.dog,
              borderColor: '#4ade80',
              backgroundColor: 'rgba(74, 222, 128, 0.2)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Horse',
              data: data.horse,
              borderColor: '#60a5fa',
              backgroundColor: 'rgba(96, 165, 250, 0.2)',
              fill: false,
              tension: 0.1,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Temperature History'
            },
            legend: {
              display: true,
              position: 'bottom',
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time (s)'
              },
              grid: {
                display: true,
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)'
              },
              grid: {
                display: true,
              },
              min: 35,
              max: 40
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div className="relative h-[500px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
