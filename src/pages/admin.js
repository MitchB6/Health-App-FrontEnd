import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [showCoaches, setShowCoaches] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [exercises, setExercises] = useState([]);

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
        const response = await axios.get(`${apiUrl}/admin/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response);
        if (response.status === 200) {
          console.log("Coaches retrieved");
          // console.log(response.data);
          setCoaches(response.data);
        } else {
          console.log('Coaches retrieval failed');
        }
      } catch (err) {
        console.log(err);
      }
    }
    const getExercises = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/exercise/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response);
        if (response.status === 200) {
          console.log("Exercises retrieved");
          // console.log(response.data);
          setExercises(response.data);
        } else {
          console.log('Exercises retrieval failed');
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (showCoaches) getCoaches();
    if (showExercises) getExercises();
  }, [showCoaches, showExercises]);

  const handleShowCoaches = () => {
    setShowCoaches(true);
    if (showExercises) setShowExercises(false);
  }
  const handleShowExercises = () => {
    setShowExercises(true);
    if (showCoaches) setShowCoaches(false);
  }
  const updateCoachStatus = (coach_id, status) => {
    setCoaches(prevCoaches => prevCoaches.filter(coach => coach.coach_id !== coach_id));
    const action = status ? "approved" : "denied";
    alert(`Coach ${coach_id} ${action}`);
  };
  const handleApprove = async (coach_id) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.put(`${apiUrl}/admin/`, {
      coach_id: coach_id,
      approved: true
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    // console.log(response);
    if (response.status === 200) {
      console.log("Coach approved");
      updateCoachStatus(coach_id, true);
      // console.log(response.data);
    } else {
      console.log('Coach approval failed');
    }
  }
  const handleDeny = async (coach_id) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.put(`${apiUrl}/admin/`, {
      coach_id: coach_id,
      approved: false
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(response);
    if (response.status === 200) {
      console.log("Coach denied");
      updateCoachStatus(coach_id, false);
      // console.log(response.data);
    } else {
      console.log('Coach denial failed');
    }
  }

  return(
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleShowCoaches}>Show Coaches</button>
      <button onClick={handleShowExercises}>Show Exercises</button>
      {showCoaches &&
      <div>
        <h2>Coaches</h2>
        <table>
          <thead>
            <tr>
              <th>Coach ID</th>
              <th>Member ID</th>
              <th>Specialization</th>
              <th>Price</th>
              <th>Location</th>
              <th>Schedule</th>
              <th>Qualifications</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.coach_id}>
                <td>{coach.coach_id}</td>
                <td>{coach.member_id}</td>
                <td>{coach.specialization}</td>
                <td>{coach.price}</td>
                <td>{coach.location}</td>
                <td>{coach.schedule_general}</td>
                <td>{coach.qualifications}</td>
                {/* <td>{coach.approved}</td> */}
                <td>
                  <button onClick={() => handleApprove(coach.coach_id)}>Accept</button>
                  <button onClick={() => handleDeny(coach.coach_id)}>Deny</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      {showExercises &&
      <div>
        <h2>Exercises</h2>
      </div>}
    </div>
  )
}

export default Admin;