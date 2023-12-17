import React, { useState, useContext, useEffect }  from 'react';
import { CoachContext } from './CoachContext';
import './styling/CoachLookup.css';
import Navbar from "../components/navbar.js";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const CoachesLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState([]); 
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [member_id, setMember_id] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    setMember_id(jwtDecode(accessToken).sub);
    const getCoaches = async () => {
      setIsLoading(true);
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
          // console.log(response.data);
          setCoaches(response.data);
        } else {
          console.log('Get coaches failed');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCoaches();
  }, []);
  useEffect(() => {
    setFilteredCoaches(coaches);
  }, [coaches]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    const tempFilteredCoaches = coaches.filter(coach =>
      coach.location?.toLowerCase().includes(searchQuery) ||
      coach.qualifications?.toLowerCase().includes(searchQuery) ||
      coach.price?.toString().toLowerCase().includes(searchQuery)
    );

    setFilteredCoaches(tempFilteredCoaches);
    console.log("Coaches filtered")
  };
  const handleHireRequest = async (coach_id) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/coaches/request_hire/${coach_id}`, {
        member_id: member_id,
        coach_id: coach_id
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response);
      if (response.status === 200) {
       console.log("Hire request successful");
        console.log(response.data);
      } else {
        console.log('Hire request failed with status: ' + response.status);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
       <Navbar />
       <div className="coaches-lookup">
       <h1>Coaches</h1>
       
          <div className="search-container-coach">
            <input 
              className="search-input-coach"
              type="text" 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Search by location, qualifications, cost" 
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
                <button className="request-button" onClick={() => handleHireRequest(coach.coach_id)}>Hire</button>
              </div>
            ))}
          </div>
       </div>
    </div> 
  );
};

export default CoachesLookup;