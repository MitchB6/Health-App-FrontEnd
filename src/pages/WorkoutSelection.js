import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Modal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const WorkoutSelection = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [selectedWID, setSelectedWID] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchAllWorkouts = async () => {
            try {
                const allWorkoutsResponse = await axios.get(`${apiUrl}/workouts/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                const allWorkouts = allWorkoutsResponse.data;

                setWorkouts(allWorkouts);
            }
            catch (error) {
                console.error('Error fetching workouts:', error);

            }
        };
        fetchAllWorkouts();
    }, []);

    const handleWorkoutClick = async (workoutId) => {
        try {
            const exercisesResponse = await axios.get(`${apiUrl}/workouts/${workoutId}/workout_exercises`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            const exercisesResponseData = exercisesResponse.data;
            setExercises(exercisesResponseData);
            setSelectedWID(workoutId);

        }
        catch (error) {
            console.error('Error fetching exercises for workout:', error);

        }
    };

    const handleSelectWorkout = async () => {
        try {
            console.log(selectedWID);
            await axios.post(`${apiUrl}/workout_plans/planid${planId}`, {
                workout_id: selectedWID,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            setModalIsOpen(true);
        }
        catch (error) {
            console.error('Error adding workout to plan:', error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/weekly-workout-plan');
    }

    return (
        <div>
            <h2>Select Workouts</h2>
            <ul>
                {workouts.map(workout => (
                    <li key={workout.workout_id}>
                        <strong onClick={() => handleWorkoutClick(workout.workout_id)}>
                            {workout.workout_name}
                        </strong>
                        <button onClick={handleSelectWorkout}>
                            +
                        </button>
                        {selectedWID === workout.workout_id && (
                            <ul>
                                {exercises.map(exercise => (
                                    <li key={exercise.workout_exercise_id}>
                                        {exercise.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Workout Added">
                <h2>Workout Added to Plan</h2>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );

}

export default WorkoutSelection;