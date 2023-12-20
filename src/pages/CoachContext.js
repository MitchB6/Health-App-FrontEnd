import { createContext, useState } from 'react';
import React from 'react';

export const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
    const [pendingRequests, setPendingRequests] = useState([]);

    const addPendingRequest = (request) => {
        setPendingRequests([...pendingRequests, request]);
    };

    return (
        <CoachContext.Provider value={{ pendingRequests, addPendingRequest }}>
            {children}
        </CoachContext.Provider>
    );
};
