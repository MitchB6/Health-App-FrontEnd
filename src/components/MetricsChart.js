import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const maxWaterIntake = 125;
const MetricsChart = ({ logEntries }) => {
    const mapEmotionToColor = (emotion) => {
        const emotionColors = {
            '😃 Happy': 'rgba(255, 206, 86, 0.5)',
            '😐 Neutral': 'rgba(75, 192, 192, 0.5)',
            '😔 Sad': 'rgba(54, 162, 235, 0.5)',
            '😠 Angry': 'rgba(255, 99, 132, 0.5)',
            '😌 Relaxed': 'rgba(153, 102, 255, 0.5)',
            '': 'rgba(201, 203, 207, 0.5)'
        };
        return emotionColors[emotion] || 'rgba(201, 203, 207, 0.8)';
    };
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
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBorderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: '#fff',
                fill: 'start',
                tension: 0.4
            }
        ],
    };

    const caloriesOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return `${value} cal 🔥`;
                    },
                    stepSize: 100, 
                    min: 0,
                    max: maxWaterIntake,
                    font: {
                        size: 16 
                    } 
                }
            },
            x: {
            }
        },
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                enabled: true, 
            }
        }
    };

    const waterIntakeData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Water Intake',
                data: logEntries.map(entry => entry.waterIntake),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                pointBorderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: '#fff',
                fill: 'start',
                tension: 0.4
            }
        ],
    };
    const waterIntakeOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return `${value} oz 💧`;
                    },
                    stepSize: 10, 
                    min: 0,
                    max: maxWaterIntake,
                    font: {
                        size: 16 
                    } 
                }
            },
            x: {
            }
        },
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                enabled: true, 
            }
        }
    };

    const emotionalWellnessData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                type: 'line', 
                label: 'Emotional Wellness Line',
                data: logEntries.map(entry => mapEmotionToNumber(entry.emotionalWellness)),
                borderColor: 'rgba(153, 102, 255, 1)', // Corrected light purple color
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                fill: 'start', 
                tension: 0.4
            },
            {
                type: 'bar', 
                label: 'Emotional Wellness Bars',
                data: logEntries.map(entry => mapEmotionToNumber(entry.emotionalWellness)),
                backgroundColor: logEntries.map(entry => mapEmotionToColor(entry.emotionalWellness)),
                
            }
        ],
    };

    
   
    const emotionalWellnessOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        const emojis = ['', '😠 Angry', '😔 Sad', '😐 Neutral', '😌 Relaxed', '😃 Happy'];
            
                        return emojis[value] ? emojis[value].split(' ')[0] : null;
                    },
                    font: {
                        size: 20 
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: false, 
            },
            legend: {
                display: false, 
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
            <Line data={caloriesChartData} options={caloriesOptions} />
            <h2>Water Intake Chart</h2>
            <Line data={waterIntakeData} options={waterIntakeOptions} />
            <h2>Emotional Wellness Chart</h2>
            <Line data={emotionalWellnessData} options={emotionalWellnessOptions} />
        </div>
    );
};

export default MetricsChart;
