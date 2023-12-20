import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/navbar.js";
import ClientStatistics from '../components/ClientStatistics'; 
import './styling/ClientProfile.css';

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                if (!accessToken || !refreshToken) {
                     console.log('No access token or refresh token');
                     return;
                    }
                
                const response = await axios.get(`${apiUrl}/clients/client_dashboard/${clientId}`, {
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
    }, [clientId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading client profile.</div>;
    }

    if (!client) {
        return <div>Client not found.</div>;
    }

    const handleAssignWorkout = () => {
        // Implement workout assignment functionality here
    };

    const handleChatWithClient = () => {
        console.log('Chat with', client.name);
        // Implement chat functionality here
    };
  

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
            <p>Workout Log: {client.workoutLog}</p>
            <div className="client-action-buttons">
                    <button className="client-profile-button" onClick={handleAssignWorkout}>Assign Workout</button>
                    <button className="client-profile-button" onClick={handleChatWithClient}>Chat</button>
            </div>
            {client.stats && <ClientStatistics stats={client.stats} />}
        </div>
        </div>
    );
};

export default ClientProfile;

