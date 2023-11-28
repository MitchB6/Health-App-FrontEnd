// data needed in servey
// name -> first, last
// gender -> male, female, other
// birthday
// height
// weight
// goal -> lose weight, gain weight, maintain weight
// target weight
// location -> city, state, zip, 
// activity level -> sedentary, lightly active, moderately active, very active, extremely active
import React, { useState } from 'react';

const InitialSurvey = () => {
  const generateDropdown = (min, max) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };
  return(
    <div>
      <label>
        First Name:
        <input type="text" placeholder="First Name" />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" placeholder="Last Name" />
      </label>
      <br />
      <label>
        Gender:
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="not_specified">Not-Specified</option>
        </select>
      </label>
      <br />
      <label>
        Birthday:
        <select>
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
        <select>
          {generateDropdown(1, 31)}
        </select>
        <select>
          {generateDropdown(1900, 2021)}
        </select>
      </label>
      <br />
      <label>
        Height:
        <select>
          {generateDropdown(4, 7)}
        </select>
        <select>
          {generateDropdown(0, 11)}
        </select>
      </label>
      <br />
      <label>
        Weight (lbs):
        <input type="text" placeholder="Weight" />
      </label>
      <br />
      <label>
        Goal:
        <select>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
          <option value="maintain">Maintain Weight</option>
        </select>
      </label>
      <br />
      <label>
        Target Weight (lbs):
        <input type="text" placeholder="Target Weight" />
      </label>
      <br />
      <label>
        Location:
        <input type="text" placeholder="City" />
        <input type="text" placeholder="State" />
        <input type="text" placeholder="Zip" />
      </label>
      <br />
      <label>
        Activity Level:
        <select>
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