import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../components/navbar.js";
import Sidebar from "../components/Sidebar.js";
import Exercises from "../components/Exercises.js";


const PreloadedWorkouts = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const apiURL = process.env.APi_URL;
    console.log(apiURL);

    useEffect(() => {
        axios.get('http://localhost:5000/exercise/')
            .then(response => {
                setExercises(response.data);
                setFilteredExercises(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const muscleGroups = [...new Set(exercises.map((exercise) => exercise.muscle_group))];
    const equipments = [...new Set(exercises.map((exercise) => exercise.equipment))];

    const filterExercises = (category, value) => {
        setSelectedCategory({ category, value });

        const filtered = exercises.filter(
            (exercise) => exercise[category] === value
        );
        setFilteredExercises(filtered);
        setSelectedExercise(null);
    }

    const handleExerciseClick = (exercise) => {
        console.log(`Details for ${exercise.name}`);
        setSelectedExercise(exercise);
    };

    return (
        <div className="preloaded-workouts">
            <Navbar />
            <Sidebar categories={['Muscle Group', 'Equipment']} onSelectCategory={filterExercises} exercises={exercises} />
            <Exercises exercises={filteredExercises} onExerciseClick={handleExerciseClick} />
            {selectedExercise && (
                <div className="exercise-details">
                    <h2 className="description">Description</h2>
                    <p>{selectedExercise.description}</p>
                </div>
            )}
        </div>
    );
};

export default PreloadedWorkouts;