import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { clients } from "./mock/mockClientData.js"
import Navbar from "../components/navbar.js";
import ClientStatistics from '../components/ClientStatistics'; 
import './styling/ClientProfile.css';

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClientData = async (id) => {
            const clientData = clients.find(client => client.id.toString() === id);
            return clientData;
        };

        fetchClientData(clientId)
            .then(data => setClient(data))
            .catch(error => console.error("Error fetching client data:", error));
    }, [clientId]);

    if (!client) {
        return <div>Loading...</div>;
    }

    const handleAssignWorkout = () => {
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

