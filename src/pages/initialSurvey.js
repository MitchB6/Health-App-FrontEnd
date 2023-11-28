// initial servey for everyone, another file will be directed to the coach if necessary
import React, { useState } from 'react';
const axios = require('axios');

const InitialSurvey = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  // const [birthday, setBirthday] = useState('');
  // const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  // const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const generateDropdown = (min, max) => {
    const options = [];
    if (min < max) {
      for (let i = min; i <= max; i++) {
        options.push(<option value={i}>{i}</option>);
      }
    }else{
      for (let i = min; i >= max; i--) {
        options.push(<option value={i}>{i}</option>);
      }
    }
    return options;
  };
  return(
    <div>
      <label>
        First Name:
        <input type="text" value={firstName} placeholder="First Name" onChange = {(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} placeholder="Last Name" onChange = {(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="not_specified">Not-Specified</option>
        </select>
      </label>
      <br />
      <label>
        Birthday:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {generateDropdown(1, 31)}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {generateDropdown(2021, 1900)}
        </select>
      </label>
      <br />
      <label>
        Height:
        <select value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)}>
          {generateDropdown(4, 9)}
        </select>
        <select value={heightInches} onChange={(e) => setHeightInches(e.target.value)}>
          {generateDropdown(0, 11)}
        </select>
      </label>
      <br />
      <label>
        Weight (lbs):
        <input type="text" value={weight} placeholder="Weight" onChange = {(e) => setWeight(e.target.value)} />
      </label>
      <br />
      <label>
        Goal:
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
          <option value="maintain">Maintain Weight</option>
        </select>
      </label>
      <br />
      <label>
        Target Weight (lbs):
        <input type="text" value={targetWeight} placeholder="Target Weight" onChange = {(e) => setTargetWeight(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={city} placeholder="City" onChange = {(e) => setCity(e.target.value)} />
        <input type="text" value={state} placeholder="State" onChange = {(e) => setState(e.target.value)} />
        <input type="text" value={zip} placeholder="Zip" onChange = {(e) => setZip(e.target.value)} />
      </label>
      <br />
      <label>
        Activity Level:
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="sedentary">Sedentary</option>
          <option value="lightly_active">Lightly Active</option>
          <option value="moderately_active">Moderately Active</option>
          <option value="very_active">Very Active</option>
          <option value="extremely_active">Extremely Active</option>
        </select>
      </label>
    </div>
  )
}

export default InitialSurvey