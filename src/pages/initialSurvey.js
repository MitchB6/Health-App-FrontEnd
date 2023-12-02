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
  const [age, setAge] = useState('');
  // const [birthday, setBirthday] = useState('');
  // const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  // const [goal, setGoal] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const birthday = `${month}/${day}/${year}`;
    const height = heightFeet * 12 + heightInches;
  }

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
      <form onSubmit={handleSubmit}>
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
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Other</option>
          </select>
        </label>
        <br />
        <label>
          Birthday:
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {generateDropdown(1, 31)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {generateDropdown(2021, 1900)}
          </select>
        </label>
        <label>
          Age:
          <input type="number" value={age} placeholder="Age" onChange = {(e) => setAge(e.target.value)} />
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
          Location:
          <input type="text" value={city} placeholder="City" onChange = {(e) => setCity(e.target.value)} />
          <input type="text" value={state} placeholder="State" onChange = {(e) => setState(e.target.value)} />
          <input type="text" value={zip} placeholder="Zip" onChange = {(e) => setZip(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default InitialSurvey