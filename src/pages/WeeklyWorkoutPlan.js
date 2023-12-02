import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyWorkoutPlan = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [showForm, setShowForm] = useState({});
    const [workoutData, setWorkoutData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableDay, setEditableDay] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentWeek);
        prevWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(prevWeek);
    }
    const handleInputChange = (day, e) => {
        const { name, value } = e.target;
        setWorkoutData(prevData => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                [name]: value,
            },
        }));
    }
/*
    const handleSave = async () => {

        if (!isLoggedIn) {
            return;
        }
        const apiUrl;

        try {
            const response = await axios.post(apiUrl, {
                data: workoutData,
            });

            console.log('Workout Plan saved successfully', response.data);
        }
        catch (error) {
            console.error('Error saving Workout Plan: ', error.message);
        }
    }
    */

    return (
        <div className="weekly-workout-plan">
            <Navbar />
            <div className="header">
                <div className="previous-week" onClick={handlePrevWeek}>←</div>
                <h2>{`Week of ${currentWeek.toDateString()}`}</h2>
                <div className="next-week" onClick={handleNextWeek}>→</div>
            </div>
            <div className="day-cards">
                {daysOfWeek.map(day, index => (
                    <div key={day} className="day-card">
                        <h3>{day}</h3>
                        <form>
                            <label>
                                Exercise: 
                                <input type="text" name="exercise" value={workoutData[day]?.exercise || ''} onChange={(e) => handleInputChange(day, e)} />
                            </label>
                        </form>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default WeeklyWorkoutPlan;