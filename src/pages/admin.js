import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './styling/admin.css';

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
        // console.log(response);
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
        // console.log(response);
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
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 20;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  }
  const handleAddExercise = async () => {
    const name = prompt("Exercise name:");
    const description = prompt("Exercise description:");
    const equipment = prompt("Exercise equipment:");
    const muscle_group = prompt("Exercise muscle group:");
    const newExercise = {
      name: name,
      description: description,
      equipment: equipment,
      muscle_group: muscle_group
    };
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken || !refreshToken) {
        console.log('No access token or refresh token');
        return;
      }
      const response = await axios.post(`${apiUrl}/exercise/`, newExercise, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log(response);
      if (response.status === 201) {
        console.log("Exercise added");
        // console.log(response.data);
        setExercises([...exercises, newExercise]);
      } else {
        console.log('Exercise addition failed');
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleActivate = async (exercise_id) => {
    try{
      const apiUrl = process.env.REACT_APP_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken || !refreshToken) {
        console.log('No access token or refresh token');
        return;
      }
      const response = await axios.put(`${apiUrl}/exercise/activate/${exercise_id}`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log(response);
      if (response.status === 200) {
        console.log("Exercise activated");
        // console.log(response.data);
        alert(`Exercise ${exercise_id} activated`);
      } else {
        console.log('Exercise activation failed');
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleDeactivate = async (exercise_id) => {
    try{
      const apiUrl = process.env.REACT_APP_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!accessToken || !refreshToken) {
        console.log('No access token or refresh token');
        return;
      }
      const response = await axios.put(`${apiUrl}/exercise/deactivate/${exercise_id}`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log(response);
      if (response.status === 200) {
        console.log("Exercise deactivated");
        // console.log(response.data);
        alert(`Exercise ${exercise_id} deactivated`);
      } else {
        console.log('Exercise deactivation failed');
      }
    }catch (err) {
      console.log(err);
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
              <th>First Name</th>
              <th>Last Name</th>
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
                <td>{coach.first_name}</td>
                <td>{coach.last_name}</td>
                <td>{coach.specialization}</td>
                <td>{coach.price}</td>
                <td>{coach.location}</td>
                <td>{coach.schedule_general}</td>
                <td>{coach.qualifications}</td>
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
        <p><button onClick={handleAddExercise}>Add Exercise</button></p>
        <table>
          <thead>
            <tr>
              <th>Exercise Name</th>
              <th>Exercise Description</th>
              <th>Exercise Equipment</th>
              <th>Exercise Muscle Group</th>
              <th>Activate/Deactivate</th>
            </tr>
          </thead>
          <tbody>
            {currentExercises.map((exercise) => (
              <tr key={exercise.exercise_id}>
                <td>{exercise.name}</td>
                <td>{exercise.description}</td>
                <td>{exercise.equipment}</td>
                <td>{exercise.muscle_group}</td>
                <td>
                  <button onClick={() => handleActivate(exercise.exercise_id)}>Activate</button>
                  <button onClick={() => handleDeactivate(exercise.exercise_id)}>Deactivate</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageLinkClassName={"page-link"}
            pageClassName={"page-item"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
      </div>}
    </div>
  )
}

export default Admin;