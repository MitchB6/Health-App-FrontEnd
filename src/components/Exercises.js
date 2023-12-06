import React from "react";

const Exercises = ({ exercises, onExerciseClick }) => {
    return (
        <div className="exercise-lise">
            <h2>Exercises</h2>
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index} onClick={() => onExerciseClick(exercise)}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercises;