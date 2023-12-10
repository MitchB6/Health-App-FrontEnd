import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MetricsChart = ({ logEntries }) => {
    const mapEmotionToNumber = (emotion) => {
        const emotions = {
            '😃 Happy': 5,
            '😐 Neutral': 3,
            '😔 Sad': 2,
            '😠 Angry': 1,
            '😌 Relaxed': 4,
            '': 0
        };
        return emotions[emotion] || 0;
    };


    const caloriesChartData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Calories In',
                data: logEntries.map(entry => entry.caloriesIn),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            }
        ],
    };

    const waterIntakeData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Water Intake',
                data: logEntries.map(entry => entry.waterIntake),
                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Solid blue color
            }
        ],
    };

    // Data for Emotional Wellness chart
    const emotionalWellnessData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Emotional Wellness',
                data: logEntries.map(entry => mapEmotionToNumber(entry.emotionalWellness)),
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Light fill color
                borderColor: 'rgba(153, 102, 255, 1)',
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                fill: 'start', // Fill from the start of the chart
            }
        ],
    };

    const generalOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
const emotionalWellnessOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    // Custom function to map the numeric value to emojis
                    callback: function (value) {
                        const emojis = ['', '😠 Angry', '😔 Sad', '😐 Neutral', '😌 Relaxed', '😃 Happy'];
                        // Return only the emoji without any additional text
                        return emojis[value] ? emojis[value].split(' ')[0] : null;
                    },
                    font: {
                        size: 20 // Adjust the size as per your preference
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: false, // Disable tooltip for this chart
            },
            legend: {
                display: false, // Hide the legend
            },
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 5 
            }
        }
    };

    return (
        <div>
            <h2>Calories Chart</h2>
            <Bar data={caloriesChartData} options={generalOptions} />
            <h2>Water Intake Chart</h2>
            <Bar data={waterIntakeData} options={generalOptions} />
            <h2>Emotional Wellness Chart</h2>
            <Line data={emotionalWellnessData} options={emotionalWellnessOptions} />
        </div>
    );
};

export default MetricsChart;
