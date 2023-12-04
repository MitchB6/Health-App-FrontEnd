import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [showCoaches, setShowCoaches] = useState(false);
  const [showExercises, setShowExercises] = useState(false);

  const handleShowCoaches = () => {
    setShowCoaches(true);
    if (showExercises) setShowExercises(false);
  }
  const handleShowExercises = () => {
    setShowExercises(true);
    if (showCoaches) setShowCoaches(false);
  }

  return(
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleShowCoaches}>Show Coaches</button>
      <button onClick={handleShowExercises}>Show Exercises</button>
      {showCoaches &&
      <div>
        <h2>Coaches</h2>
      </div>}
      {showExercises &&
      <div>
        <h2>Exercises</h2>
      </div>}
    </div>
  )
}

export default Admin