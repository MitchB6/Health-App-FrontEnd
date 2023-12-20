// import React from 'react';

const Exercises = ({ exercises, handleExerciseClick }) => {
    return (
        <div className='exercises'>
            <h2 className='exercise-list'>Exercises List</h2>
            <ul className='list-of-exercises'>
                {exercises.map((exercise) => (
                    <li key={exercise.name} onClick={() => handleExerciseClick(exercise)}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercises;