import React, { useState } from 'react';
import mockCoaches from './mock/mockCoachesData.js';
import Navbar from "../components/navbar.js";
import CoachList from './CoachList.js';
import CoachDetails from './CoachProfile.js';
import './styling/MemberDashboard.css';


const MemberDashboard = () => {
    const [selectedCoach, setSelectedCoach] = useState(null);

    const handleSelectCoach = coach => {
        console.log('Selected coach:', coach);
        if (selectedCoach && selectedCoach.id === coach.id) {
            setSelectedCoach(null); 
        } else {
            setSelectedCoach(coach);
        }
    };

    // Chat with coach function
    const chatWithCoach = coachName => {
        console.log('Chatting with', coachName);
    };

    return (
        <div>
            <Navbar />
            <div className="member-page">
                <h1>Member Dashboard</h1>
                <CoachList coaches={mockCoaches} onSelectCoach={handleSelectCoach} />
                {selectedCoach && <CoachDetails coach={selectedCoach}  onChat={chatWithCoach} />}
            </div>
        </div>
    );
};

export default MemberDashboard;
