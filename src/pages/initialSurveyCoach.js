import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pages-styling/auth.css';
import { jwtDecode } from "jwt-decode";

const InitialSurveyCoach = () => {
  const [specialization, setSpecialization] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [schedule_general, setScheduleGeneral] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [memberID, setMemberID] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    setMemberID(jwtDecode(accessToken).sub);
    const surveyData = {
      specialization: specialization,
      price: price,
      location: location,
      schedule_general: schedule_general,
      qualifications: qualifications,
      member_id: memberID
    }
    try{
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/auth/coach_signup`, surveyData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log(response);
      if(response.status === 200){
        console.log("Coach Survey successful");
        // console.log(response.data);
        navigate('/initial-survey');
      }else{
        console.log('Coach Survey failed');
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="initial-survey-page">
    <div className='survey-container'>
      <h2>Coach Initial Survey</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Specialization:
          <input type="text" value={specialization} placeholder="Specialization" onChange = {(e) => setSpecialization(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} placeholder="Price" onChange = {(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} placeholder="Location" onChange = {(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Schedule:
          <input type="text" value={schedule_general} placeholder="Schedule" onChange = {(e) => setScheduleGeneral(e.target.value)} />
        </label>
        <br />
        <label>
          Qualifications:
          <input type="text" value={qualifications} placeholder="Qualifications" onChange = {(e) => setQualifications(e.target.value)} />
        </label>
        <br />
        <input type='submit' value='Submit' className='submit-button' />
      </form>
    </div>
    </div>
  );
};

export default InitialSurveyCoach;