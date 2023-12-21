import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import WorkoutDetails from './WorkoutDetails.js';


const AddWorkout = () => {
    const { id } = useParams()
    const [cardNumber, setCardNumber] = useState(id);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutId, setWorkoutId] = useState(null);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;



    const handleNameChange = (e) => {
        setWorkoutName(e.target.value);
    };

    const handleSave = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
            console.log('No access token or refresh token');
            return;
        }


        axios.post(`${apiUrl}/workouts/`, {
            workout_name: workoutName, 
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log('Response Data:', response.data);
                const createdWID = parseInt(response.data.message.split(': ')[1], 10);
                console.log('CWID:', createdWID);
                setWorkoutId(createdWID);
    
            })
            .catch(error => {
                console.error('Error creating workout:', error);
            });
    };

    useEffect(() => {
        if (workoutId != null) {
            console.log('Workout ID:', workoutId)
            navigate(`/workout-details/${workoutId}`);

        }
    }, [workoutId, navigate])

    return (
        <div className='add-workout'>
            <label>
                Workout Name:
                <input type="text" value={workoutName} onChange={handleNameChange} />
            </label>
            <button onClick={handleSave}>Next</button>
            <Routes>
            <Route path="/workout-details/:id" element={<WorkoutDetails />} />
            </Routes>
        </div>
    );
};

export default AddWorkout;