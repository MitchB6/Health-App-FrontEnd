import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import AccountSettings from './pages/AccountSettings.js';
import CoachesLookup from './pages/CoachesLookup.js'; // Import Coaches Look Up page
import InitialSurvey from './pages/initialSurvey.js';
import WeeklyWorkoutPlan from './pages/WeeklyWorkoutPlan.js';
import WorkoutNotebook from './pages/WorkoutNotebook.js';
import PreloadedWorkouts from './pages/PreloadedWorkouts.js';


function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly-workout-plan" element={<WeeklyWorkoutPlan />} />
          <Route path="/workout-notebook" element={<WorkoutNotebook />} />
          <Route path="/preloaded-workouts" element={<PreloadedWorkouts />} />
          <Route path="/signup" element={<Signup onSwitch={handleSwitch} />} />
          <Route path="/login" element={<Login onSwitch={handleSwitch} />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/coaches-lookup" element={<CoachesLookup />} />
          <Route path="*" element={<Navigate to="/account-settings" replace />} />
          <Route path="/initial-survey" element={<InitialSurvey />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
