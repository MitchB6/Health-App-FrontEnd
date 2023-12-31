import { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../components/Sidebar.js";
import Subcategories from "../components/Subcategories.js";
import Exercises from "../components/Exercises.js";
import Navbar from "../components/navbar.js";
import './pages-styling/exercisebank.css';

const ExerciseBank = () => {
    const [categories] = useState(['muscle_group', 'equipment']);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [originalExercises, setOriginalExercises] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        axios.get(`${apiUrl}/exercise/`)
            .then(response => {
                setExercises(response.data);
                setOriginalExercises(response.data);

                const muscleGroups = [...new Set(response.data.map(exercise => exercise.muscle_group))];
                const equipment = [...new Set(response.data.map(exercise => exercise.equipment))];
                setSubcategories({
                    "muscle_group": muscleGroups,
                    "equipment": equipment,
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
  
        const filteredExercises = originalExercises.filter(exercise => exercise[category.toLowerCase()] != null);
        console.log('Filtered Exercises:', filteredExercises);
        setExercises(filteredExercises);
        setSelectedExercise(null);
   

    };

    const handleSubcategoryClick = (subcategory) => {

        const filteredExercises = originalExercises.filter(exercise => {
        const categoryProperty = selectedCategory.toLowerCase();
        return exercise[categoryProperty].toLowerCase() === subcategory.toLowerCase();
        });
        console.log('Filtered Exercises:', filteredExercises);
        setExercises(filteredExercises);
        setSelectedExercise(null);


    };

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        console.log('selected:', selectedExercise);
    };

    return ( 
            <div className="exercise-bank">
                <Navbar />
                <h2 className="eb-title">Exercise Bank 🏋️‍♂️</h2>
                <div className="exercise-bank-container">
        
                    <div className="sidebar-1">
                        <div className="filters">
                
                            <Sidebar categories={categories} handleCategoryClick={handleCategoryClick}/>
            
                        </div>
                        </div>
                        <div className="subcategories-container">
                            <Subcategories subcategories={subcategories[selectedCategory]} handleSubcategoryClick={handleSubcategoryClick} />
                        </div>
                    
        
                    <div className="subcategories-exercises-container">
                        <div className="exercise-description-container">
                            <div className="exercise-name">
                                <Exercises exercises={exercises} handleExerciseClick={handleExerciseClick} />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        
    );
};

export default ExerciseBank;
