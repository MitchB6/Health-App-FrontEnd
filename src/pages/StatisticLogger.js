import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import MetricsChart from '../components/MetricsChart.js';
import './styling/StatisticLogger.css';


const StatisticLogger = () => {
    const [weight, setWeight] = useState('');
    const [caloriesIn, setCaloriesIn] = useState('');
    const [caloriesOut, setCaloriesOut] = useState('');
    const [emotionalWellness, setEmotionalWellness] = useState('');
    const [logEntries, setLogEntries] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {
            date: new Date().toLocaleDateString(),
            weight: parseFloat(weight),
            caloriesIn: parseFloat(caloriesIn),
            caloriesOut: parseFloat(caloriesOut),
            emotionalWellness
        };

        setLogEntries([...logEntries, newEntry]);
        setWeight('');
        setCaloriesIn('');
        setCaloriesOut('');
        setEmotionalWellness('');
    };

    return (
        <div>
            <Navbar />
            <div className="statistic-logger">
                <h1>Statistic Logger</h1>
                <form onSubmit={handleSubmit}>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
                    <input type="number" value={caloriesIn} onChange={(e) => setCaloriesIn(e.target.value)} placeholder="Calories In" />
                    <input type="number" value={caloriesOut} onChange={(e) => setCaloriesOut(e.target.value)} placeholder="Calories Out" />
                    <select value={emotionalWellness} onChange={(e) => setEmotionalWellness(e.target.value)}>
                        <option value="">Select Emotional Wellness</option>
                        <option value="😃 Happy">😃 Happy</option>
                        <option value="😐 Neutral">😐 Neutral</option>
                        <option value="😔 Sad">😔 Sad</option>
                        <option value="😠 Angry">😠 Angry</option>
                        <option value="😌 Relaxed">😌 Relaxed</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
                <MetricsChart logEntries={logEntries} />
            </div>
        </div>
    );
};

export default StatisticLogger;