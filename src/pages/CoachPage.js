import React, { useState, useContext, useEffect } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import Navbar from "../components/navbar.js";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import './styling/CoachPage.css';

const CoachPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientsState, setClients] = useState([]); 
    const [pendingRequestsState, setPendingRequests] = useState([]); 
    const apiUrl = process.env.REACT_APP_API_URL;
    const accessToken = localStorage.getItem('accessToken');
    const [username, setUsername] = useState('');
    const [memberId, setMemberId] = useState(null);
    const { member_id } = useParams() || member_id;

    useEffect(() => {
        const fetchInitialData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            if (!accessToken || !refreshToken) {
                console.log('No access token or refresh token');
                return;
            }

            try {
                const decoded = jwtDecode(accessToken);
                setMemberId(decoded.sub); // Changed to setMemberId
            } catch (error) {
                console.error('Error decoding token:', error);
            }

            // Fetching member details
            if (member_id) {
                try {
                    const memberResponse = await axios.get(`${apiUrl}/members/${member_id}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setUsername(memberResponse.data.name); // Assuming name is in the response
                } catch (error) {
                    console.error('Error fetching member details:', error);
                }
            }

            // Fetching clients
            try {
                const clientsResponse = await axios.get(`${apiUrl}/clients/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setClients(clientsResponse.data);
                console.log("Clients state after fetch:", clientsState);

            } catch (error) {
                console.error('Error fetching clients:', error);
            }

            // Fetching client requests
            try {
                const requestsResponse = await axios.get(`${apiUrl}/clients/requests`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setPendingRequests(requestsResponse.data);
            } catch (error) {
                console.error('Error fetching client requests:', error);
            }
        };

        fetchInitialData();
    }, [member_id]);

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
            // Send the accept request to the server
            await axios.post(`${apiUrl}/clients/accept_request/${requestId}`, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
    
            // Update the state to remove the accepted request from pendingRequestsState
            setPendingRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
    
            // Find the accepted request from pendingRequestsState
            const acceptedRequest = pendingRequestsState.find(request => request.id === requestId);
    
            // Add the accepted request to the clientsState
            if (acceptedRequest) {
                setClients(currentClients => [...currentClients, acceptedRequest]);
            }
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };
    
    const denyClientRequest = async (requestId) => {
        try {
            // Send the decline request to the server
            await axios.post(`${apiUrl}/clients/decline_request/${requestId}`, {}, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
    
            // Update the state to remove the declined request from pendingRequestsState
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
                            <span>{`${request.first_name || 'First'} ${request.last_name || 'Last'}`}</span>

                            {/* Log the client's full name */}
                            
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
