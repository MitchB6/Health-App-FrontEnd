import React from 'react';

const ClientDetails = ({ client, onAssignWorkout }) => {
    if (!client) return <div>Select a client to see details</div>;

    const fullName = `${client.first_name} ${client.last_name}`;
   
    return (
        <div className="client-details">
            <h3>{fullName}'s Details</h3>
            <p>Workout Log: {client.workoutLog}</p>
            <button onClick={() => onAssignWorkout(client)}>Assign Workout</button>
        </div>
    );
}

export default ClientDetails;