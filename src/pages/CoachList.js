import React from 'react';

const CoachList = ({ coaches, onSelectCoach }) => {
    return (
        <div className="coach-list">
            {coaches.map(coach => (
                <div key={coach.id} className="coach-item" onClick={() => onSelectCoach(coach)}>
                    {coach.name}
                </div>
            ))}
        </div>
    );
};

export default CoachList;
