import React, { useState, useContext } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import { clients, pendingRequests } from './mockClientData';
import { CoachContext } from './CoachContext';
import Navbar from "../components/navbar.js";

const CoachPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientsState, setClients] = useState(clients); 
    const [pendingRequestsState, setPendingRequests] = useState(pendingRequests); 

    const handleSelectClient = client => {
        setSelectedClient(client);
    };

    const handleAssignWorkout = client => {
        console.log('Assigning workout to', client.name);
    };
    const { pendingRequests: contextPendingRequests } = useContext(CoachContext);
    console.log("Rendering CoachPage, pendingRequests:", pendingRequests);

    const acceptClientRequest = requestId => {
        const request = pendingRequestsState.find(request => request.id === requestId);
        setClients(currentClients => [...currentClients, request]);
        setPendingRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
    };

    const denyClientRequest = requestId => {
        setPendingRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
    };

    return (
        <div>
        <Navbar />
        <div className="coach-page">
            <h1>Coach Dashboard</h1>
            <div className="client-requests">
                <h2>Pending Client Requests</h2>
                {pendingRequestsState.map(request => (
                    <div key={request.id}>
                        <span>{request.name}</span>
                        <button onClick={() => acceptClientRequest(request.id)}>Accept</button>
                        <button onClick={() => denyClientRequest(request.id)}>Deny</button>
                    </div>
                ))}
            </div>
            
            <ClientList clients={clientsState} onSelectClient={handleSelectClient} />
            <ClientDetails client={selectedClient} onAssignWorkout={handleAssignWorkout} />
        </div>
        </div>
    );
};

export default CoachPage;
