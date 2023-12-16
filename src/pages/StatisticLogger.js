import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import MetricsChart from '../components/MetricsChart.js';
import './styling/StatisticLogger.css';

const StatisticLogger = () => {
    const [caloriesIn, setCaloriesIn] = useState('');
    const [waterIntake, setWaterIntake] = useState(''); 
    const [emotionalWellness, setEmotionalWellness] = useState('');
    const [logEntries, setLogEntries] = useState([]);
    const [currentMoodEmoji, setCurrentMoodEmoji] = useState('😊');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {
            date: new Date().toLocaleDateString(),
            caloriesIn: parseFloat(caloriesIn),
            waterIntake: parseFloat(waterIntake), 
            emotionalWellness
        };

        setLogEntries([...logEntries, newEntry]);
        setCaloriesIn('');
        setWaterIntake(''); 
        setEmotionalWellness('');
    };

    const handleMoodChange = (e) => {
        setEmotionalWellness(e.target.value);
        setCurrentMoodEmoji(e.target.options[e.target.selectedIndex].text.split(' ')[0]);
    };

    return (
        <div>
            <Navbar />
            <div className="statistic-logger">
                <h1>Statistic Logger</h1>
                <form onSubmit={handleSubmit}>
                <div className="input-statistic-container">
                    <span className="input-statistic-icon">🔥</span> {/* Calories Icon */}
                    <input type="number" value={caloriesIn} onChange={(e) => setCaloriesIn(e.target.value)} placeholder="Calories In" />
                    <span className="input-statistic-unit">cal</span>
                </div>
                <div className="input-statistic-container">
                    <span className="input-statistic-icon">💧</span> {/* Water Intake Icon */}
                    <input type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} placeholder="Water Intake (in ounces)" />
                    <span className="input-statistic-unit">oz</span>
                </div>
                    <div className="input-statistic-container">
                        <span className="input-statistic-icon">{currentMoodEmoji}</span> {/* Mood Icon */}
                        <select value={emotionalWellness} onChange={handleMoodChange}>
                            <option value="">Select Emotional Wellness</option>
                            <option value="😃 Happy">😃 Happy</option>
                            <option value="😐 Neutral">😐 Neutral</option>
                            <option value="😔 Sad">😔 Sad</option>
                            <option value="😠 Angry">😠 Angry</option>
                            <option value="😌 Relaxed">😌 Relaxed</option>
                        </select>
                        <span className="input-statistic-unit"></span>
                    </div>
    
                    <button type="submit">Submit</button>
                </form>
                <MetricsChart logEntries={logEntries} />
            </div>
        </div>
    );
    
    };

export default StatisticLogger;
