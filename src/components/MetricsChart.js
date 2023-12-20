import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MetricsChart = ({ logEntries }) => {
const maxWaterIntake = 10;



    const caloriesChartData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Calories In',
                data: logEntries.map(entry => entry.calories_intake),
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
                data: logEntries.map(entry => entry.hydration_level),
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
                        return `${value} btl 💧`;
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


    const moodChartData = {
        labels: logEntries.map(entry => entry.date),
        datasets: [
            {
                type: 'line', 
                label: 'Emotional Wellness Line',
                data: logEntries.map(entry => entry.mood_level),
                borderColor: 'rgba(153, 102, 255, 1)', // Corrected light purple color
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                fill: 'start', 
                tension: 0.4
            }
        ],
    };
    
    const moodChartOptions = {
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
            <Line data={moodChartData} options={moodChartOptions} />
        </div>
    );

};
export default MetricsChart;