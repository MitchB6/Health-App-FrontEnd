import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/navbar";
import ClientStatistics from '../components/ClientStatistics';
import './styling/ClientProfile.css';

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/clients/${clientId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setClient(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching client data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchClientData();
    }, [clientId, apiUrl, accessToken]);

    const handleAssignWorkout = async (workoutDetails) => {
        try {
          const workoutResponse = await axios.post(`${apiUrl}/workouts/`, {
            workout_name: workoutDetails.workoutName,
          }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
      
          const workoutId = workoutResponse.data.workout_id;
      
          await axios.post(`${apiUrl}/workouts/member/${clientId}`, {
            workout_id: workoutId,
          }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
      
          console.log('Workout assigned to client successfully');
        } catch (error) {
          console.error('Error assigning workout:', error);
        }
      };
      

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading client profile.</div>;
    }

    if (!client) {
        return <div>Client not found.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="client-profile">
                <h2>{client.name}'s Profile</h2>
                <p>Email: {client.email}</p>
                <p>Phone: {client.phone}</p>
                <p>Age: {client.age}</p>
                <p>Gender: {client.gender}</p>
                <p>Location: {client.location}</p>
                <div className="client-action-buttons">
                    <button className="client-profile-button" onClick={handleAssignWorkout}>Assign Workout</button>
                </div>
                {client.stats && <ClientStatistics stats={client.stats} />}
            </div>
        </div>
    );
};

export default ClientProfile;
