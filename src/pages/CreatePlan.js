import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const CreatePlan = () => {
    const [plan_name, setPlanName] = useState('');
    const [plan_description, setPlanDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();



    const createPlan = async () => {
        try {
            const createPlanResponse = await axios.post(`${apiUrl}/workout_plans/`, {
                plan_name: plan_name,
                plan_description: plan_description,
                start_date: start_date,
                end_date: end_date,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
            }
        });
            console.log('Plan created successfully');
    }
        catch (error) {
            console.error('Error creating plan:', error);
    }
}
    const handleSaveClick = () => {
        createPlan();
        navigate('/weekly-workout-plan');
    }

    return (
        <div className="create-plan">
            <div className="create-plan-container">
                <div className="create-plan-items-container">
                    <label>
                        Plan Name:
                        <input className="input-wrapper" type="text" value={plan_name} onChange={(e) => {setPlanName(e.target.value)}} />
                    </label>
                    <label>
                        Description:
                        <input className="input-wrapper" type="text" value={plan_description} onChange={(e) => {setPlanDescription(e.target.value)}} />
                    </label>
                    <label>
                        Start Date:
                        <input className="input-wrapper" placeholder="yyyy-mm-dd" type="text" value={start_date} onChange={(e) => {
                            const newValue = e.target.value;
                            setStartDate(newValue);
                            setEndDate(newValue);
                        }} />
                    </label>
                    <button className="submit-button" onClick={handleSaveClick}>Save</button>
                </div>

            </div>
        </div>
    )



}

export default CreatePlan;


