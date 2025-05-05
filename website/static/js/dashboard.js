// static/js/dashboard.js
let chart;
let selectedAnimalId = 1;

function fetchReadings() {
    $.get("/api/temperature/", function (data) {
        let tbody = '';
        let animalTemps = {};

        data.forEach(item => {
            const temp = item.temperature.toFixed(1);
            const status = (temp > 39 || temp < 36) ? '⚠️ Abnormal' : '✅ Normal';

            tbody += `
                <tr>
                    <td>${item.animal_id}</td>
                    <td>${temp}</td>
                    <td>${item.timestamp}</td>
                    <td>${status}</td>
                </tr>
            `;

            // Group temperatures by animal for charting
            if (!animalTemps[item.animal_id]) animalTemps[item.animal_id] = [];
            animalTemps[item.animal_id].push({
                time: item.timestamp,
                temp: temp
            });
        });

        $('#reading-body').html(tbody);
        updateChart(animalTemps[selectedAnimalId] || []);
    });
}

function fetchAlerts() {
    $.get("/api/alerts/", function (data) {
        let html = '';
        data.forEach(item => {
            html += `<div class="alert alert-danger">🚨 Animal ${item.animal_id} has abnormal temperature: ${item.temperature.toFixed(1)}°C</div>`;
        });
        $('#alerts').html(html);
    });
}

function updateChart(tempData) {
    const labels = tempData.map(t => t.time);
    const temps = tempData.map(t => t.temp);

    if (!chart) {
        const ctx = document.getElementById('tempChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temps,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.2
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 34,
                        max: 42
                    }
                }
            }
        });
    } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = temps;
        chart.update();
    }
}

$(document).ready(function () {
    fetchReadings();
    fetchAlerts();

    setInterval(() => {
        fetchReadings();
        fetchAlerts();
    }, 5000);  // every 5 seconds
});
