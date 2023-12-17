import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from 'axios';
import ExerciseSelection from "../components/ExerciseSelection";

const WorkoutDetails = ({ setSelectedExercises }) => {
    const { workoutId: workoutId } = useParams();
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [sequence, setSequence] = useState(0);
    const [notes, setNotes] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;


    console.log('WID', workoutId);
    const handleSave = () => {
        console.log('Save Button Clicked');
        console.log('Selected Exercise:', selectedExercise);
        console.log('Reps:', reps);
        console.log('Sets:', sets);
        console.log('Sequence:', sequence);
        console.log('Notes:', notes);
        if (selectedExercise && reps && sets && sequence && notes && exercises.length < 8) {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
    
            if (!accessToken || !refreshToken) {
                console.log('No access token or refresh token');
                return;
            }

            const { exercise_id } = selectedExercise;
            const newExercise = { exercise_id, reps, sets, sequence, notes };
            setExercises([...exercises, newExercise]);

            axios.post(`${apiUrl}/workouts/${workoutId}/workout_exercises`, {
                exercise_id: exercise_id,
                reps: reps,
                sets: sets,
                sequence: sequence,
                notes: notes,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })

                .then(response => {
                    console.log('Workout Created: ', response.data);

                    setExercises([]);
                    setSelectedExercise(null);
                    setReps(0);
                    setSets(0);
                    setSequence(0);
                    setNotes('');
                })
                .catch(error => {
                    console.error('Error adding exercises to workout: ', error);
                });

        }
    }

    const handleExerciseSelect = (exercise) => {
        console.log('Exercise Selected:', exercise);
        setSelectedExercise(exercise);
    }

    return (
        <div className="workout-details">
            <h2>Add Exercises</h2>
            <ExerciseSelection workoutId={workoutId} onExerciseSelect={handleExerciseSelect} />
            <label>
                Sets:
                <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            </label>
            <label>
                Reps:
                <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            </label>
            <label>
                Sequence:
                <input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
            </label>
            <label>
                Notes:
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>

            <button onClick={handleSave}>Save Exercise</button>
            <NavLink to="/workout-notebook">Back to Workout Notebook</NavLink>
        </div>
    );
};

export default WorkoutDetails;