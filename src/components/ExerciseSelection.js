import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseDropdown from "./ExerciseDropdown";
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import CategoriesDropdown from "./CategoriesDropdown";

const ExerciseSelection = ({ workoutId, onExerciseSelect }) => {
  const [categories] = useState(['muscle_group', 'equipment']);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [originalExercises, setOriginalExercises] = useState([]);

  useEffect(() => {
      axios.get('http://127.0.0.1:5000/exercise/')
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
      setSelectedExercise('');
      console.log('Selected Exercise:', selectedExercise);
  };

  useEffect(() => {
    console.log('Selected Exercise', selectedExercise);
  }, [selectedExercise]);

  const handleSubcategoryClick = (subcategory) => {

      const filteredExercises = originalExercises.filter(exercise => {
      const categoryProperty = selectedCategory.toLowerCase();
      return exercise[categoryProperty].toLowerCase() === subcategory.toLowerCase();
      });
      console.log('Filtered Exercises:', filteredExercises);
      setExercises(filteredExercises);
      setSelectedExercise('');
      console.log('Selected Exercise:', selectedExercise);


  };
  useEffect(() => {
    console.log('Selected Exercise', selectedExercise);
  }, [selectedExercise]);

  const handleExerciseClick = (exercise) => {
    console.log('Clicked exercise:', exercise);
    setSelectedExercise(exercise);
    console.log('Selected Exercise:', selectedExercise)

  };

  useEffect(() => {
    console.log('Selected Exercise', selectedExercise);
    onExerciseSelect(selectedExercise);
  }, [selectedExercise]);

  console.log('ExerciseSelection rendered');

  

  return (
    <div>
      <CategoriesDropdown categories={categories} handleCategoryClick={handleCategoryClick} />
      <SubcategoriesDropdown subcategories={subcategories[selectedCategory]} handleSubcategoryClick={handleSubcategoryClick} />

      <ExerciseDropdown exercises={exercises} handleExerciseClick={handleExerciseClick} /> 
    </div>
  );

  };
  
  export default ExerciseSelection;
  