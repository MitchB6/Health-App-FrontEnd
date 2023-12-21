import { useEffect, useState } from "react";
import React from 'react';
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
    const [editingName, setEditingName] = useState(null);
    const [newName, setNewName] = useState('');
    const [selectedWID, setSelectedWID] = useState(null);
    const [showDeleteWorkoutConfirmation, setShowDeleteConfirmation] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;


    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // const apiUrl = process.env.REACT_APP_API_URL;


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

    const handleEditNameClick = (workoutId) => {
        setSelectedWID(workoutId);
        setEditingName(true);
        document.querySelector('.edit-name-modal').style.display = 'block';
        
    }
    const handleNameChange = async (workoutId, workoutName) => {
        try {
            const nameChangeResponse = await axios.put(`${apiUrl}/workouts/${workoutId}/`, {
                workout_name: workoutName,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            console.log('Workout Name Updated Successfully'); 
            document.querySelector('.edit-name-modal').style.display = 'none';
        }

        catch (error) {
            console.error('Error updating name:', error);

        }
    }


    const handleEdit = (workout_exercise_id, exercise) => {
        setSelectedWEID(workout_exercise_id);
        setSelectedExercise(exercise);
        setIsModalOpen(true);
        document.querySelector('.card-modal').style.display = 'block';

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
            document.querySelector('.card-modal').style.display = 'none';

        }
        catch (error) {
            console.error('Error Updating Exercise:', error);
        }
    }

    const handleCloseModal = () => {
        setSelectedWEID(null);
        setSelectedExercise(null);
        setIsModalOpen(false);
        document.querySelector('.card-modal').style.display = 'none';

    }
    const handleDeleteClick = (workout_exercise_id) => {
        setSelectedWEID(workout_exercise_id);
        setShowConfirmation(true);
        document.querySelector('.delete-card-modal').style.display = 'block';

    }
    const handleNoButtonClick = () => {
        setShowConfirmation(false);
        setShowDeleteConfirmation(false);
        setEditingName(false);
        document.querySelector('.delete-card-modal').style.display = 'none';
        document.querySelector('.edit-name-modal').style.display = 'none';
        document.querySelector('.delete-workout-card-modal').style.display = 'none';



      };

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
            document.querySelector('.delete-card-modal').style.display = 'none';


        }
    }

    const handleDeleteWorkoutClick = (workoutId) => {
        setSelectedWID(workoutId);
        setShowDeleteConfirmation(true)
        document.querySelector('.delete-workout-card-modal').style.display = 'block';      
    }

    const handleWorkoutDelete = async (workoutId) => {
        try {
            const workoutDeleteResponse = await axios.delete(`${apiUrl}/workouts/${workoutId}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            console.log('Workout deleted.');
            setShowDeleteConfirmation(false);
            document.querySelector('.delete-workout-card-modal').style.display = 'none';

        }
        catch (error) {
            console.error('Error deleting workout:', error);
        }
    }




    return (
        <div className="workout-notebook-container">
            <Navbar />
        <div className="workout-notebook">
            <h2 className="notebook-title">Workout Notebook 🗒️</h2>
            <div className="link-to-weekly">
            <NavLink to="/add-workout" className="to-add-workout">Create a Workout</NavLink>

                <NavLink to="/weekly-workout-plan" className="to-weekly">Plan Your Workouts</NavLink>
                {workouts.map((workout) => (
                    <div className="workouts"key={workout.workout_id} onClick={() => handleCardClick(workout.workout_id)}>
                        <div className="workout-container">
                        <h3>{workout.workout_name} ⇣</h3>
                        <button className="edit-name-button" onClick={() => handleEditNameClick(workout.workout_id)}>Edit Name</button>
                        <button className="delete-workout-button" onClick={() => handleDeleteWorkoutClick(workout.workout_id)}>Delete Workout</button>
                        </div>
                        {workout.exercises && (
                            <ul className="workout-exercises-container">
                                {workout.exercises.map((exercise, index) => (
                                    <li key={index} className="exercise-item">
                                        <div className="exercise-info">
                                        <strong>{exercise.name}</strong> - Reps: {exercise.reps} | Sets: {exercise.sets} | Notes: {exercise.notes}
                                        </div>
                                        <div className="buttons-ed-container">
                                        <button className="edit-exercice-button" onClick={() => handleEdit(exercise.workout_exercise_id, exercise)}>Edit</button>
                                        <button className="delete-exercise-button" onClick={() => handleDeleteClick(exercise.workout_exercise_id)}>Delete</button>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

        </div>
        <div className="card-modal">
        {isModalOpen && selectedWEID && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onEdit={handleSaveEditChanges} workout_exercise_id={selectedWEID} initialReps={exercise.reps} initialSets={exercise.sets} initialNotes={exercise.notes} />
        )}
        </div>
        <div className="delete-card-modal">
        {showConfirmation && (
            <div className="confirmation-message">
                <p>Are you sure you want to delete this exercise?</p>
                <button className="yes-button" onClick={() => handleExerciseDelete(selectedWEID)}>Yes</button>
                <button className="no-button" onClick={handleNoButtonClick}>No</button>
            
            </div>
            
        )}
        </div>
        <div className="delete-workout-card-modal">
            {showDeleteWorkoutConfirmation && (
                <div className="delete-message">
                    <p>Are you sure you want to delete this workout?</p>
                    <button className="yes-button" onClick={() => handleWorkoutDelete(selectedWID)}>Yes</button>
                    <button className="no-button" onClick={handleNoButtonClick}>No</button>
                </div>
            )}
        </div>
        <div className="edit-name-modal">
            {editingName && (
                <div className="new-name">
                    <label>
                        Enter a new name for your workout:
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                        <div className="button-container">
                        <button className="save-button" onClick={() => handleNameChange(selectedWID, newName)}>Save</button>
                        <button className="cancel-button" onClick={handleNoButtonClick}>Cancel</button>
                        </div>
                    </label>
                </div>
            )}
        </div>

        
        </div>
    );
};

export default WorkoutNotebook;