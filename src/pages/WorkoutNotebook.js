import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar.js";
import Modal from "../components/Modal.js";
import './pages-styling/workout-notebook.css';

const WorkoutNotebook = () => {
    const [workouts, setWorkouts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedWEID, setSelectedWEID] = useState(null);
    const [exercise, setSelectedExercise] = useState(null)

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/workouts/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                setWorkouts(response.data);
                console.log(workouts);
            }
            catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        getWorkouts();

    }, []);

    const handleCardClick = async (workoutId) => {
        try {
            const exerciseResponse = await axios.get(`${apiUrl}/workouts/${workoutId}/workout_exercises`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            const exercises = exerciseResponse.data;

            console.log(`Exercises for Workout ${workoutId}:`, exercises);

            setWorkouts((prevWorkouts) => 
                prevWorkouts.map((workout) => 
                    workout.workout_id === workoutId ? { ...workout, exercises } : workout))
        }
        catch (error) {
            console.error(`Error fetching exercises for workout ${workoutId}:`, error);
        }
    };


    const handleEdit = (workout_exercise_id, exercise) => {
        setSelectedWEID(workout_exercise_id);
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    }

    const handleSaveEditChanges = async (workout_exercise_id, editedReps, editedSets, editedNotes) => {
        try {
            const response = await axios.put(`${apiUrl}/workouts/workout_exercise/${workout_exercise_id}`, {
                reps: editedReps,
                sets: editedSets,
                notes: editedNotes,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            console.log('Exercise Updated Successfully:', response.data);
            setIsModalOpen(false);
        }
        catch (error) {
            console.error('Error Updating Exercise:', error);
        }
    }

    const handleCloseModal = () => {
        setSelectedWEID(null);
        setSelectedExercise(null);
        setIsModalOpen(false);
    }
    const handleDeleteClick = (workout_exercise_id) => {
        setSelectedWEID(workout_exercise_id);
        setShowConfirmation(true);
    }

    const handleExerciseDelete = async (workout_exercise_id) => {
        try {
            await axios.delete(`${apiUrl}/workouts/workout_exercise/${workout_exercise_id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
        }
        catch (error) {
            console.error('Error deleting exercise:', error);
        }
        finally {
            setShowConfirmation(false);

        }
    }



    return (
        <div className="workout-notebook-container">
            <Navbar />
        <div className="workout-notebook">
            <h2 className="notebook-title">Workout Notebook</h2>
            <div className="link-to-weekly">
                <NavLink to="/weekly-workout-plan" className="to-weekly">Plan Your Week</NavLink>
                <NavLink to="/add-workout" className="to-weekly">Add a Workout</NavLink>
                {workouts.map((workout) => (
                    <div key={workout.workout_id} onClick={() => handleCardClick(workout.workout_id)}>
                        <h3>{workout.workout_name}</h3>
                        {workout.exercises && (
                            <ul>
                                {workout.exercises.map((exercise, index) => (
                                    <li key={index}>
                                        <strong>{exercise.name}</strong> - Reps: {exercise.reps}, Sets: {exercise.sets}, Notes: {exercise.notes}
                                        <button onClick={() => handleEdit(exercise.workout_exercise_id, exercise)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(exercise.workout_exercise_id)}>Delete</button>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

        </div>
        {isModalOpen && selectedWEID && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onEdit={handleSaveEditChanges} workout_exercise_id={selectedWEID} initialReps={exercise.reps} initialSets={exercise.sets} initialNotes={exercise.notes} />
        )}
        {showConfirmation && (
            <div className="confirmation-message">
                <p>Are you sure you want to delete this exercise?</p>
                <button onClick={() => handleExerciseDelete(selectedWEID)}>Yes</button>
                <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
        )}

        
        </div>
    );
};

export default WorkoutNotebook;