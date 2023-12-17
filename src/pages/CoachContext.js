import React, { createContext, useState } from 'react';

export const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [clients, setClients] = useState([]);

    const addPendingRequest = (request) => {
        setPendingRequests([...pendingRequests, request]);
    };

    const addClient = (client) => {
        setClients([...clients, client]);
    };

    return (
        <CoachContext.Provider value={{ pendingRequests, addPendingRequest, clients, addClient }}>
            {children}
        </CoachContext.Provider>
    );
};
