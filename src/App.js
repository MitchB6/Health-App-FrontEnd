import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js'; 
import CoachesLookup from './pages/CoachesLookup.js'; 
import CoachPage from './pages/CoachPage.js'; 
import { CoachProvider } from './pages/CoachContext.js'; 
import ClientProfile from './pages/ClientProfile.js';
import StatisticLogger from './pages/StatisticLogger.js';
import Admin from './pages/admin.js';
import InitialSurvey from './pages/initialSurvey.js';
import WeeklyWorkoutPlan from './pages/WeeklyWorkoutPlan.js';
import WorkoutNotebook from './pages/WorkoutNotebook.js';
import ExerciseBank from './pages/PreloadedWorkouts.js';
import MemberDashboard from './pages/MemberDashboard.js'


function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <CoachProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly-workout-plan" element={<WeeklyWorkoutPlan />} />
          <Route path="/workout-notebook" element={<WorkoutNotebook />} />
          <Route path="/preloaded-workouts" element={<ExerciseBank />} />
          <Route path="/signup" element={<Signup onSwitch={handleSwitch} />} />
          <Route path="/login" element={<Login onSwitch={handleSwitch} />} />
          <Route path="/statistic-logger" element={<StatisticLogger />} />
          <Route path="/coach" element={<CoachesLookup />} />
          <Route path="/coach-page" element={<CoachPage />} />
          <Route path="/client-profile/:clientId" element={<ClientProfile />} />
          <Route path="/initial-survey" element={<InitialSurvey />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/member-dashboard" element={<MemberDashboard />} />
        </Routes>
      </div>
      </CoachProvider>
    </Router>
  );
}

export default App;