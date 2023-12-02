import React, { useState } from 'react';
import './styling/CoachesLookup.css';
import mockCoaches from './mockCoachesData'; // Import the mock data

const CoachesLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState(mockCoaches); // Initialize with mock data

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredCoaches = mockCoaches.filter(coach =>
      coach.name.toLowerCase().includes(query) ||
      coach.location.toLowerCase().includes(query) ||
      coach.goal.toLowerCase().includes(query) ||
      coach.cost.toString().toLowerCase().includes(query)
    );

    setCoaches(filteredCoaches);
  };

  return (
    <div className="container">
  <div className="search-bar">
    <input 
      type="text" 
      value={searchQuery} 
      onChange={handleSearchChange} 
      placeholder="Search by name, availability, location, goal, cost" 
    />
    <button className="search-button">Search</button>
  </div>
  <div className="coaches-list">
    {coaches.map((coach) => (
      <div key={coach.id} className="coach">
        <h3>{coach.name}</h3>
        <p>Availability: {coach.availability}</p>
        <p>Location: {coach.location}</p>
        <p>Goal: {coach.goal}</p>
        <p>Cost: ${coach.cost}/hr</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default CoachesLookup;
