import React, { useState, useContext, useEffect } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import { CoachContext } from './CoachContext';
import Navbar from "../components/navbar.js";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './styling/CoachPage.css';

const CoachPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientsState, setClients] = useState([]); 
    const [pendingRequestsState, setPendingRequests] = useState([]); 
    const apiUrl = process.env.REACT_APP_API_URL;
    const accessToken = localStorage.getItem('accessToken');
    const [member_id, setMember_id] = useState(null);


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
        console.log('No access token or refresh token');
        return;
    }

    try {
        const decoded = jwtDecode(accessToken);
        setMember_id(decoded.sub);
    } catch (error) {
        console.error('Error decoding token:', error);
    }

        axios.get(`${apiUrl}/clients/`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(response => {
            console.log("Clients data:", response.data);
            setClients(response.data);
        })
          .catch(error => console.error('Error fetching clients:', error));

        // Fetch pending requests
        axios.get(`${apiUrl}/clients/requests`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(response => setPendingRequests(response.data))
          .catch(error => console.error('Error fetching client requests:', error));
    }, []);

    const handleSelectClient = client => {
        console.log('Selected client:', client);
        setSelectedClient(client);
    };

    const handleAssignWorkout = async (clientId, workoutDetails) => {
        try {
            // Create a new workout
            const workoutResponse = await axios.post(`${apiUrl}/workouts/`, workoutDetails, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const workoutId = workoutResponse.data.workout_id;
    
            // Assign workout to client
            await axios.post(`${apiUrl}/workouts/member/${clientId}/workout/${workoutId}`, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
    
            console.log('Workout assigned to client successfully');
        } catch (error) {
            console.error('Error assigning workout:', error);
        }
    };
    

    const acceptClientRequest = async (requestId) => {
        try {
            await axios.post(`${apiUrl}/clients/accept_request/${requestId}`, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            // Update state to reflect changes
            setPendingRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };
    
    const denyClientRequest = async (requestId) => {
        try {
            await axios.post(`${apiUrl}/clients/decline_request/${requestId}`, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            // Update state to reflect changes
            setPendingRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error declining request:', error);
        }
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
                            <div className="button-container-coach">
                                <button className="client-accept-button" onClick={() => acceptClientRequest(request.id)}>Accept</button>
                                <button className="client-decline-button" onClick={() => denyClientRequest(request.id)}>Decline</button>
                            </div>
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
