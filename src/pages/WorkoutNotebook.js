import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Card from "../components/Card.js";
import './pages-styling/workout-notebook.css';

const WorkoutNotebook = () => {
    const [cards, setCards] = useState([]);
    const [workoutData, setWorkoutData] = useState({});

    const handleSave = (userData) => {
        setCards((prevCards) => [...prevCards, userData]);
    };

    const handleInputChange = (entry, e) => {
        const { name, value } = e.target;
        setWorkoutData(prevData => ({
            ...prevData,
            [entry]: {
                ...prevData[entry],
                [name]: value,
            },
        }));

    };

    const initialCards = [
        {title: ''},
        {title: ''},
        {title: ''},
        {title: ''},
        {title: ''},
        {title: ''},
    ];

    return (
        <div className="workout-notebook-container">
            <Navbar />
        <div className="workout-notebook">
            <h2 className="notebook-title">Workout Notebook</h2>
            <div className="link-to-weekly">
                <NavLink to="/weekly-workout-plan" className="to-weekly">Plan Your Week</NavLink>
            </div>
            <div className="card-container">
            {initialCards.map((cardData, index) => (
                <Card key={index} cardData={cardData} onChange ={(e) => handleInputChange(cardData, e)} onSave={handleSave} />
            ))}
            {cards.map((cardData, index) => (
                <Card key={index} cardData={cardData} onChange ={(e) => handleInputChange(cardData, e)}onSave={handleSave} />
            ))}
            </div>

        </div>
        </div>
    );
};

export default WorkoutNotebook;