import React from 'react';
import { Line } from 'react-chartjs-2';
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
    const weightChartData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Weight',
                data: logEntries.map(entry => entry.weight),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)',
            }
        ],
    };

    const caloriesChartData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Calories In',
                data: logEntries.map(entry => entry.caloriesIn),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Calories Out',
                data: logEntries.map(entry => entry.caloriesOut),
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
            }
        ],
    };

    const emotionalWellnessData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Emotional Wellness',
                data: logEntries.map(entry => mapEmotionToNumber(entry.emotionalWellness)),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgb(153, 102, 255)',
                borderWidth: 1,
            }
        ],
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        elements: {
            line: {
                tension: 0.4 // This will smooth the line
            }
        }
    };

    return (
        <div>
            <h2>Weight Chart</h2>
            <Line data={weightChartData} options={options} />
            <h2>Calories Chart</h2>
            <Line data={caloriesChartData} options={options} />
            <h2>Emotional Wellness Chart</h2>
            <Line data={emotionalWellnessData} options={options} />
        </div>
    );
};

export default MetricsChart;
