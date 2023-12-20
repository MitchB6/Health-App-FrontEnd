import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import Navbar from "../components/navbar";



const WeeklyWorkoutPlan = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [workoutData, setWorkoutData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableDay, setEditableDay] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const daysOfWeekCards = [
        {title: 'Monday'},
        {title: 'Tuesday'},
        {title: 'Wednesday'},
        {title: 'Thursday'},
        {title: 'Friday'},
        {title: 'Saturday'},
        {title: 'Sunday'},
    ];

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
        <div className="weekly-workout-plan-container">
            <Navbar />
            <div className="weekly-workout-plan">
                <h2 className="wwp-title">Weekly Workout Plans</h2>
                <button className="previous-week-button" onClick={handlePrevWeek}>←</button>
                <h3>{`Week of ${currentWeek.toDateString()}`}</h3>
                <button className="next-week-button" onClick={handleNextWeek}>→</button>
            </div>
            <div className="day-cards">
                {daysOfWeekCards.map((cardData, index) => (
                    <Card key={index} cardData={cardData} onChange={(e) => handleInputChange(cardData, e)} />
                ))}
                {cards.map((cardData, index) => (
                    <Card key={index} cardData={cardData} onChange={(e) => handleInputChange(cardData, e)} />
                ))}
            </div>
        </div>
    );
};

export default WeeklyWorkoutPlan;