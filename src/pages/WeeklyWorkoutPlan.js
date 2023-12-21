import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Calendar from 'react-calendar';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import './pages-styling/weekly-workout-plan.css';



const WeeklyWorkoutPlan = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [plans, setPlans] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [caloriesInput, setCaloriesInput] = useState("");
    const [durationInput, setDurationInput] = useState("");

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const apiUrl = process.env.REACT_APP_API_URL;


    const navigate = useNavigate();

  const handleDateChange = dayIndex => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayIndex);
    setSelectedDate(newDate);
    console.log(selectedDate);
  };

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const fetchPlans = async () => {
        try {
            const plansResponse = await axios.get(`${apiUrl}/workout_plans/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            const plansResponseData = plansResponse.data;

            const filteredPlans = plansResponseData.filter(plan => plan.start_date === formattedDate);
            setPlans(filteredPlans);

        }
        catch (error) {
            console.error('Error fetching plans:', error);
        }
    };
    fetchPlans();
  }, [selectedDate]);

  const createPlanClick = () => {
    navigate('/create-plan');
  }


    const fetchPlanWorkouts = async (planId) => {
        try {
            const workoutsResponse = await axios.get(`${apiUrl}/workout_plans/planid${planId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            const workouts = workoutsResponse.data;

            setPlans(prevPlans => prevPlans.map(plan =>
                plan.plan_id === planId
                ? { ...plan, workouts }
                : plan));
        }
        catch (error) {
            console.error(`Error fetching workouts for plan ${planId}:`, error);
        }
    };

    useEffect(() => {
        plans.forEach(plan => {
            fetchPlanWorkouts(plan.plan_id);
        });
    }, [plans]);

    const deleteWorkout = async (planId, linkId) => {
        try {
            await axios.delete(`${apiUrl}/workout_plans/linkid${linkId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            fetchPlanWorkouts(planId);
        }
        catch (error) {
            console.error(`Error deleting workout:`, error);
        }
    }

    const handleStatsModalOpen = () => {
        setShowStatsModal(true);
    }
    const handleStatsModalClose = () => {
        setShowStatsModal(false);
    }

    const sentStats = async (workoutId ,duration, calories) => {
        try {
            handleStatsModalOpen();
            await axios.post(`${apiUrl}/workouts/${workoutId}/stats`, {
                duration: duration,
                calories_burned: calories,

            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            handleStatsModalClose();
        }
        catch (error) {
            console.error('Error adding stats:', error);
        }
    }

    const handleCaloriesChange = (e) => {
        setCaloriesInput(e.target.value);
    }
    const handleDurationChange = (e) => {
        setDurationInput(e.target.value);
    }

  return (
    <div className="weekly-workout-plan">
      <Navbar />
      <h2>Plan Your Workouts 🗓️</h2>
      <div className="calendar-container">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>
      <div className="plans-container">
        <h2>Plans for {selectedDate.toDateString()}</h2>
        <button className="submit-button" onClick={createPlanClick}>
          Create Plan
        </button>
        <ul>
          {plans.map((plan) => (
            <li key={plan.plan_id}>
              <strong>{plan.plan_name}</strong> - {plan.description}
              {plan.workouts && (
                <ul>
                  {plan.workouts.map((workout) => (
                    <li key={workout.workout_id}>
                      {workout.workout_name}
                      <button
                        onClick={() =>
                          deleteWorkout(plan.plan_id, workout.link_id)
                        }
                      >
                        Delete Workout
                      </button>
          
                    </li>
                  ))}
                </ul>
              )}
              <Link to={`/workout-selection/${plan.plan_id}`}>
                <button>Add Workout</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyWorkoutPlan;