import React, { useState, useEffect } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import Navbar from "../components/navbar.js";
import axios from 'axios';
import './styling/CoachPage.css';

const CoachPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientsState, setClients] = useState([]);
    const [pendingRequestsState, setPendingRequests] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getClients = async () => {
            try {
                const clientsResponse = await axios.get(`${apiUrl}/clients/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setClients(clientsResponse.data);

                const requestsResponse = await axios.get(`${apiUrl}/clients/requests`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setPendingRequests(requestsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getClients();
    }, []);

    const handleSelectClient = (client) => {
        console.log('Selected client:', client);
        setSelectedClient(client);
    };

    const handleAssignWorkout = (client) => {
        console.log('Assigning workout to', client.name);
    };

    const acceptClientRequest = async (link_id) => {
        try {
            await axios.post(`${apiUrl}/clients/accept_request/${link_id}`,  {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            setClients((currentClients) => [...currentClients, pendingRequestsState.find((request) => request.id === link_id)]);
            setPendingRequests((currentRequests) => currentRequests.filter((request) => request.id !== link_id));
        } catch (error) {
            console.error("Error accepting client request:", error);
        }
    };

    const denyClientRequest = async (link_id) => {
        try {
            await axios.post(`${apiUrl}/clients/decline_request/${link_id}`,  {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            setPendingRequests((currentRequests) => currentRequests.filter((request) => request.id !== link_id));
        } catch (error) {
            console.error("Error declining client request:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="coach-page">
                <h1>Coach Dashboard</h1>
                <div className="client-requests">
                    <h2>Pending Client Requests</h2>
                    {pendingRequestsState.map((request) => (
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
