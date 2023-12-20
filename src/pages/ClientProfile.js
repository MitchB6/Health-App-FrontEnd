import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar.js";
import ClientStatistics from '../components/ClientStatistics'; 
import './styling/ClientProfile.css';
import { clients } from './mock/mockClientData.js';

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Function to fetch client data based on clientId
        const fetchClientData = () => {
            // Find the client in the mock data based on the clientId
            const foundClient = clients.find(client => client.id === parseInt(clientId));
            setClient(foundClient);
        };

        fetchClientData();
    }, [clientId]);

    if (!client) {
        return <div>Loading...</div>;
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
