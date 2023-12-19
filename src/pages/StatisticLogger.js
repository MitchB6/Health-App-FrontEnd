import { createContext, useState } from 'react';
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) {
          console.log('No access token or refresh token');
          return;
        }
        const newEntry = {
            date: new Date().toLocaleDateString(),
            calories_intake: parseFloat(calories_intake),
            hydration_level: parseFloat(hydration_level), 
            mood_level
        };
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/survey/{survey_id}`, newEntry, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                console.log('Statistics logged successfully');
            }
        } catch (error) {
            console.error('Error logging statistics:', error);
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
                    <input type="number" value={hydration_level} onChange={(e) => setWaterIntake(e.target.value)} placeholder="Water Intake (in ounces)" />
                    <span className="input-statistic-unit">oz</span>
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
