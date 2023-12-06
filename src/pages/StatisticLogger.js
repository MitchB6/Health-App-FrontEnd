import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import './styling/StatisticLogger.css';

const LoggerForm = () => {
    const [weight, setWeight] = useState('');
    const [caloriesIn, setCaloriesIn] = useState('');
    const [caloriesOut, setCaloriesOut] = useState('');
    const [emotionalWellness, setEmotionalWellness] = useState('');
    const [physicalWellness, setPhysicalWellness] = useState('');
    const [logEntries, setLogEntries] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const newEntry = {
            date: new Date().toLocaleDateString(),
            weight,
            caloriesIn,
            caloriesOut,
            emotionalWellness,
            physicalWellness,
        };

        setLogEntries([...logEntries, newEntry]);

    
        setWeight('');
        setCaloriesIn('');
        setCaloriesOut('');
        setEmotionalWellness('');
        setPhysicalWellness('');
    };

    return (
        <div>
        <Navbar/>
        <div className="statistic-logger">
            <h1>Statistic Logger</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
                <input type="number" value={caloriesIn} onChange={(e) => setCaloriesIn(e.target.value)} placeholder="Calories In" />
                <input type="number" value={caloriesOut} onChange={(e) => setCaloriesOut(e.target.value)} placeholder="Calories Out" />
                <input type="text" value={emotionalWellness} onChange={(e) => setEmotionalWellness(e.target.value)} placeholder="Emotional Wellness" />
                <input type="text" value={physicalWellness} onChange={(e) => setPhysicalWellness(e.target.value)} placeholder="Physical Wellness" />
                <button type="submit">Submit</button>
            </form>
            {logEntries.map((entry, index) => (
                <div key={index}>
                    <p>Date: {entry.date}</p>
                    <p>Weight: {entry.weight}</p>
                    <p>Calories In: {entry.caloriesIn}</p>
                    <p>Calories Out: {entry.caloriesOut}</p>
                    <p>Emotional Wellness: {entry.emotionalWellness}</p>
                    <p>Physical Wellness: {entry.physicalWellness}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default LoggerForm;