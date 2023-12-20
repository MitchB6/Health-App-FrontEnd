import React from 'react';

const CoachDetails = ({ coach, onChat }) => {
    return (
        <div className="coach-details">
            <h2>{coach.name}</h2>
            <p>Specialization: {coach.specialization}</p>
            <p>Email: {coach.email}</p>
            <p>Phone: {coach.phone}</p>
            <p>Location: {coach.location}</p>
            <p>Availability: {coach.availability}</p>
            <p>Cost: ${coach.cost}</p>
            <button className="chatWithCoach-button" onClick={() => onChat(coach.name)}>Chat</button>
        </div>
    );
};

export default CoachDetails;
