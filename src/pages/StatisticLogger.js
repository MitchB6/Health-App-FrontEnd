<<<<<<< HEAD
import { createContext, useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 3038fadc81bf9c92116e2ab87c568299e062ff8c
import Navbar from "../components/navbar.js";
import MetricsChart from '../components/MetricsChart.js';
import './styling/StatisticLogger.css';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const StatisticLogger = () => {
    const [calories_intake, setCaloriesIn] = useState('');
    const [hydration_level, setWaterIntake] = useState(''); 
    const [mood_level, setEmotionalWellness] = useState('');
    const [logEntries, setLogEntries] = useState([]);
    const [currentMoodEmoji, setCurrentMoodEmoji] = useState('😊');
    const [member_id, setMember_id] = useState(0);

    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
        console.log('No access token or refresh token');
        return;
    }

    try {
        setMember_id(jwtDecode(accessToken).sub);

        // Fetch survey data after setting the member ID
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/survey/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}`}
                });
                if (response.status === 200 && response.data) {
                    setLogEntries(response.data); 
                }
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchData();
    } catch (error) {
        console.error('Error decoding token:', error);
    }
}, []);


    const moodMap = {
        "😃 Happy": 1,
        "😐 Neutral": 2,
        "😔 Sad": 3,
        "😠 Angry": 4,
        "😌 Relaxed": 5
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!member_id) {
            console.error('Member ID is not set');
            return;
        }
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) {
          console.log('No access token or refresh token');
          return;
        }

       // const moodValue = mood_level.split(' ')[1];
  //      const moodLevelValue = moodMap[moodValue] || 0;
  const moodLevelValue = moodMap[mood_level] || 0;

        const newEntry = {
            member_id: member_id,
           date:  new Date().toLocaleDateString(),
        //    energy_level: 2,
        mood_level: moodMap[mood_level] || 0,
            hydration_level: parseFloat(hydration_level),
            calories_intake: parseInt(calories_intake, 10),
           // recorded_at: new Date().toISOString()
        };
     //   console.log("Mood Level:", mood_level, "Mapped Value:", moodLevelValue);
        console.log("Sending data:", newEntry);

        try {
            const response = await axios.post(`${apiUrl}/survey/`, newEntry, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                console.log('Statistics logged successfully');
               setLogEntries(prevEntries => [...prevEntries, newEntry]);
            }
        } catch (error) {
            console.error('Error logging statistics:', error);
            if (error.response) {
                console.error('Response:', error.response.data); // Detailed error message from backend
            }
        }

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
                    <input type="number" value={calories_intake} onChange={(e) => setCaloriesIn(e.target.value)} placeholder="Calories In" />
                    <span className="input-statistic-unit">cal</span>
                </div>
                <div className="input-statistic-container">
                    <span className="input-statistic-icon">💧</span> {/* Water Intake Icon */}
                    <input type="number" value={hydration_level} onChange={(e) => setWaterIntake(e.target.value)} placeholder="Water Intake (in bottles)" />
                    <span className="input-statistic-unit">btl</span>
                </div>
                    <div className="input-statistic-container">
                        <span className="input-statistic-icon">{currentMoodEmoji}</span> {/* Mood Icon */}
                        <select value={mood_level} onChange={handleMoodChange}>
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