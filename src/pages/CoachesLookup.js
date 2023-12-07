import React, { useState, useContext, useEffect }  from 'react';
// import mockCoaches from './mockCoachesData'; 
import { CoachContext } from './CoachContext';
import './styling/CoachLookup.css';
import Navbar from "../components/navbar.js";
import axios from 'axios';

const CoachesLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState([]); 
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    const getCoaches = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/coaches/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        // console.log(response);
        if (response.status === 200) {
          console.log("Get coaches successful");
          console.log(response.data);
          setCoaches(response.data);
        } else {
          console.log('Get coaches failed');
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCoaches();
    setFilteredCoaches(coaches);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    const tempFilteredCoaches = coaches.filter(coach =>
      coach.name.toLowerCase().includes(searchQuery) ||
      coach.availability.toLowerCase().includes(searchQuery) ||
      coach.location.toLowerCase().includes(searchQuery) ||
      coach.goal.toLowerCase().includes(searchQuery) ||
      coach.cost.toString().toLowerCase().includes(searchQuery)
    );

    setFilteredCoaches(tempFilteredCoaches);
  };
  const { addPendingRequest } = useContext(CoachContext);
  const handleHireRequest = (coachId) => {
    console.log(`Request sent to hire coach with ID: ${coachId}`);
    addPendingRequest({ id: coachId, name: 'User Name' }); 
  };

  return (
    <div>
       <Navbar />
       <div className="coaches-lookup">
       <h1>Coaches</h1>
       
          <div className="search-container">
            <input 
              className="search-input"
              type="text" 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Search by name, availability, location, qualifications, cost" 
            />
            <button className="search-button" onClick={handleSearchClick}>Search</button>
          </div>
          <div className="coaches-list">
            {filteredCoaches.map((coach) => (
              <div key={coach.coach_id}>
                <h3>Coach {coach.first_name} {coach.last_name}</h3>
                <p>Availability: {coach.schedule_general}</p>
                <p>Location: {coach.location}</p>
                <p>Qualifications: {coach.qualifications}</p>
                <p>Cost: ${coach.price}/hr</p>
                <button className="request-button" onClick={() => handleHireRequest(coach.id)}>Hire</button>
              </div>
            ))}
          </div>
       </div>
    </div> 
  );
};

export default CoachesLookup;
