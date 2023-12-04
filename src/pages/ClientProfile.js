import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar.js";

const ClientProfile = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Mock function to simulate fetching data
        const fetchClientData = async (id) => {
            // Replace this with actual data fetching logic
            return {
                id: id,
                name: "John Doe",
                email: "johndoe@example.com",
                // other client details
            };
        };

        fetchClientData(clientId)
            .then(data => setClient(data))
            .catch(error => console.error("Error fetching client data:", error));
    }, [clientId]);

    if (!client) {
        return <div>Loading...</div>;
    }

    const handleAssignWorkout = () => {
        // Logic to assign a workout
    };

    return (
        <div>
        <Navbar />
        <div>
            <h2>{client.name}'s Profile</h2>
            {/* Display client information */}
            <p>Email: {client.email}</p>
            {/* Other details */}
            
            <button onClick={handleAssignWorkout}>Assign Workout</button>
        </div>
        </div>
    );
};

export default ClientProfile;
