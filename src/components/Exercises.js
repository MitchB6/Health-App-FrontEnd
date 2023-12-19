import './components-styling/exercises.css';

const Exercises = ({ exercises, handleExerciseClick }) => {
    return (
        <div className='exercises-container'>
            <table className='exercises-table'>
                <thead>
                    <tr>
                        <th colSpan="1">Exercises</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => (
                        <tr className='exercise' key={exercise.name} onClick={() => handleExerciseClick(exercise)}>
                            <td data-tooltip={exercise.description}>{exercise.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Exercises;