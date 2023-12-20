// initial servey for everyone, another file will be directed to the coach if necessary
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './styling/auth.css';
import { useNavigate } from 'react-router-dom';

const InitialSurvey = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('o');
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2021);
  const [age, setAge] = useState(0);
  // const [birthday, setBirthday] = useState('');
  // const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState(4);
  const [heightInches, setHeightInches] = useState(0);
  const [weight, setWeight] = useState(0);
  // const [goal, setGoal] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState(10000);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    const birthday = `${year}-${month}-${day}`;
    const surveyData = {
      first_name: firstName,
      last_name: lastName,
      city: city,
      state: state,
      zip_code: zip,
      birthdate: birthday,
      height: (heightFeet * 12 + heightInches),
      weight: weight,
      age: age,
      gender: gender
    }
    try{
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${apiUrl}/member/settings`, surveyData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log(response);
      // console.log(surveyData.zip_code)
      // console.log(surveyData.birthday)
      if (response.status === 200) {
        console.log("Survey successful");
        // console.log(response.data);
        navigate('/');
      } else {
        console.log('Survey failed');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const generateDropdown = (min, max) => {
    const options = [];
    if (min < max) {
      for (let i = min; i <= max; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }else{
      for (let i = min; i >= max; i--) {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return options;
  };
  return(
    <div className="initial-survey-page">
    <div className='survey-container'>
      <h2>Initial Survey</h2>
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
          <input type="number" value={weight} placeholder="Weight" onChange = {(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={city} placeholder="City" onChange = {(e) => setCity(e.target.value)} />
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <input type="number" value={zip} placeholder="Zip" onChange = {(e) => setZip(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" className='submit-button' />
      </form>
    </div>
    </div>
  )
}

export default InitialSurvey