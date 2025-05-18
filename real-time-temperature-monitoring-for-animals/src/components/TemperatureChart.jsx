"use client";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

export default function TemperatureChart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const animals = Object.keys(data);
    if (animals.length === 0) return;

    const labels = data[animals[0]]?.map((_, i) => i * 2) || [];

    if (!chartInstanceRef.current && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const datasets = animals.map((animal) => ({
        label: animal,
        data: data[animal],
        borderColor: getColorForAnimal(animal),
        backgroundColor: getColorForAnimal(animal, 0.2),
        fill: false,
        tension: 0.1,
      }));

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            title: {
              display: true,
              text: "Temperature History",
            },
            legend: {
              display: true,
              position: "bottom",
            },
            annotation: {
              annotations: {
                lowerBound: {
                  type: "line",
                  yMin: 35.2,
                  yMax: 35.2,
                  borderColor: "rgba(255, 165, 0, 0.8)",
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    content: "Lower Threshold (35.2°C)",
                    enabled: true,
                    position: "start",
                    backgroundColor: "rgba(255, 165, 0, 0.8)",
                    color: "black",
                  },
                },
                upperBound: {
                  type: "line",
                  yMin: 39.7,
                  yMax: 39.7,
                  borderColor: "rgba(255, 0, 0, 0.8)",
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    content: "Upper Threshold (39.7°C)",
                    enabled: true,
                    position: "start",
                    backgroundColor: "rgba(255, 0, 0, 0.8)",
                    color: "white",
                  },
                },
              },
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
              max: 41,
            },
          },
        },
      });
    } else if (chartInstanceRef.current) {
      const chart = chartInstanceRef.current;

      const lastIndex = chart.data.labels.length;
      chart.data.labels.push(lastIndex * 2);

      animals.forEach((animal) => {
        const tempHistory = data[animal];
        const dataset = chart.data.datasets.find((ds) => ds.label === animal);

        if (dataset) {
          dataset.data.push(tempHistory[tempHistory.length - 1]);

          if (dataset.data.length > 20) {
            dataset.data.shift();
          }
        } else {
          chart.data.datasets.push({
            label: animal,
            data: tempHistory,
            borderColor: getColorForAnimal(animal),
            backgroundColor: getColorForAnimal(animal, 0.2),
            fill: false,
            tension: 0.1,
          });
        }
      });

      if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
      }

      chart.update("none");
    }
  }, [data]);

  return (
    <div className="relative h-[500px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

const colorCache = {};

function getColorForAnimal(animal, opacity = 1) {
  const baseColors = {
    cow: `rgba(248, 113, 113, ${opacity})`,
    dog: `rgba(74, 222, 128, ${opacity})`,
    horse: `rgba(96, 165, 250, ${opacity})`,
    goat: `rgba(251, 191, 36, ${opacity})`,
    sheep: `rgba(192, 132, 252, ${opacity})`,
    chiken: `rgba(255, 255, 255, ${opacity})`,
  };

  const key = animal.toLowerCase();

  if (baseColors[key]) return baseColors[key];

  if (!colorCache[key]) {
    const r = Math.floor(Math.random() * 156) + 100;
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    colorCache[key] = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return colorCache[key].replace(/[\d.]+(?=\))$/, opacity);
}