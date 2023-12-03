import React, { useState } from 'react';
import mockCoaches from './mockCoachesData'; 
import './styling/CoachesLookup.css';

const CoachesLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState(mockCoaches); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    const filteredCoaches = mockCoaches.filter(coach =>
      coach.name.toLowerCase().includes(searchQuery) ||
      coach.availability.toLowerCase().includes(searchQuery) ||
      coach.location.toLowerCase().includes(searchQuery) ||
      coach.goal.toLowerCase().includes(searchQuery) ||
      coach.cost.toString().toLowerCase().includes(searchQuery)
    );

    setCoaches(filteredCoaches);
  };

  return (
    <div className="coaches-lookup">
      <div className="search-container"> {/* New wrapper div */}
        <input 
          className="search-input"
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Search by name, availability, location, goal, cost" 
        />
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="coaches-list">
        {coaches.map((coach) => (
          <div key={coach.id}>
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