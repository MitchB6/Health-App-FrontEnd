
const ExerciseDropdown = ({ exercises, handleExerciseClick }) => {
    return (
      <label>
        Choose an Exercise:
        <select onChange={(e) => handleExerciseClick(e.target.value)}>
          <option value="" enabled>Select an Exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.name} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </label>
    );
  };

  export default ExerciseDropdown;
  