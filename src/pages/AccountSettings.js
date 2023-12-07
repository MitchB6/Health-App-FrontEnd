import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling/AccountSettings.css';
import Navbar from "../components/navbar.js";

const AccountSettings = () => {
    // States for user information

    const [name, setName] = useState('User Name');
    const [birthDate, setBirthDate] = useState('YYYY-MM-DD'); 
    const [gender, setGender] = useState('Gender');
    const [email, setEmail] = useState('user@example.com');
    const [phoneNumber, setPhoneNumber] = useState('(123) 456-7890');
    const [goals, setGoals] = useState(['']);

    
    // Separate state for city, state, and zipCode
    const [city, setCity] = useState('City');
    const [state, setState] = useState('State');
    const [zipCode, setZipCode] = useState('12345');

    // States for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // State for edit and password change mode toggle
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);

    // State for user feedback
    const [message, setMessage] = useState('');

    // Toggle edit mode
    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
        if (isPasswordChangeMode) setIsPasswordChangeMode(false);
        setMessage('');
    };

    // Toggle password change mode
    const handlePasswordChangeMode = () => {
        setIsPasswordChangeMode(!isPasswordChangeMode);
        if (isEditMode) setIsEditMode(false);
        setMessage('');
    };

    // Enhanced submit user info with basic validation
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.includes('@')) {
            setMessage('Please enter a valid email address.');
            return;
        }
        if (phoneNumber && phoneNumber.length < 10) {
            setMessage('Please enter a valid phone number.');
            return;
        }

        // API call to update user information
        try {
            const response = await axios.post('/api/updateUserInfo', {
                name,
                email,
                phoneNumber,
                location: { city, state, zipCode }, // Sending location as an object
            });
            setMessage('User information updated successfully!');
            console.log('Updated User Information:', response.data);
        } catch (error) {
            setMessage('');
            console.error('Error:', error);
        }

        setIsEditMode(false);
    };

    // Handle phone number change
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };


    // Fetch user's selected goals when the component mounts
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get('/api/getUserGoals');
                setGoals(response.data.goals || []); // Ensuring goals is always an array
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, []);

    // Handle goal change
    const handleGoalChange = (selectedGoal) => {
        setGoals(prevGoals => {
            if (prevGoals.includes(selectedGoal)) {
                return prevGoals.filter(goal => goal !== selectedGoal);
            } else {
                return [...prevGoals, selectedGoal];
            }
        });
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage("New passwords do not match!");
            return;
        }
        // Add logic to change password here
        setMessage("Password successfully changed!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsPasswordChangeMode(false);
    };
    const handleCancelEdit = () => {
        
        setIsEditMode(false);
        setMessage('');
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const response = await axios.delete('/api/deleteAccount');
                console.log('Account deleted:', response.data);
                // Redirect or perform further actions upon successful deletion
            } catch (error) {
                console.error('Error deleting the account:', error);
            }
        }
    };
    const [isCoach, setIsCoach] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/userData');
                if (response.data.userType === 'coach') {
                    setIsCoach(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // states for coach-specific information
    const [price, setPrice] = useState('');
    const [qualification, setQualification] = useState('');
    const [schedule, setSchedule] = useState(''); // This could be a string or an array, depending on how you want to handle it
    const [specialization, setSpecialization] = useState('');

    return (<div>
        <Navbar />
         <div className="account-settings">
            <h1>Settings Page</h1>
            {message && <div className="feedback-message">{message}</div>}
            <form onSubmit={isPasswordChangeMode ? handlePasswordChange : handleSubmit}>
                <h2>Basic Info</h2> 
                {/* User Section */}
                <div className="setting">
                <label>Name</label>
                    {isEditMode ? (
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <span>{name}</span>
                         )}
                </div>
                <div className="setting">
                    <label>Birth Date</label>
                    {isEditMode ? (
                        <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}/>
                        ) : (
                            <span>{birthDate}</span>
                             )}
                </div>
                <div className="setting">
                     <label>Gender</label>
                     {isEditMode ? (
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                             <option value="male">Male</option>
                             <option value="female">Female</option>
                             <option value="other">Other</option>
                        </select>
                         ) : (
                            <span>{gender}</span>
                             )}
                </div>
                <div className="setting">
                     <label>Email</label>
                     {isEditMode ? (
                         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                         ) : (
                            <span>{email}</span>
                            )}
                </div>
                <div className="setting">
                    <label>Phone number:</label>
                    {isEditMode ? (
                        <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
                        ) : (
                            <span>{phoneNumber}</span>
                            )}
                </div>
                <div className="setting">
                    <label>Location</label>
                     {isEditMode ? (
                        <>
                         <div className="setting">
                            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="setting">
                            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                        <div className="setting">
                             <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                        </>
                        ) : (
                            <span>{`${city}, ${state} ${zipCode}`}</span>
                            )}
                </div>
                {/* Goals Section */}
                <div className="setting">
                    <label>Your Goals</label>
                    {isEditMode ? (
                        ['Goal 1', 'Goal 2', 'Goal 3'].map(goalOption => (
                             <div key={goalOption}>
                                <input
                                 type="checkbox"
                                 checked={goals.includes(goalOption)}
                                 onChange={() => handleGoalChange(goalOption)}
                                 />
                                 {goalOption}
                            </div>
                             ))
                             ) : (
                             <ul>
                                {goals.map(goal => (
                                    <li key={goal}>{goal}</li>
                                     ))}
                                      </ul>
                                      )}
                        </div>
                        <h2>Account Info</h2>
                         <div className="account-info">
                            {/* Password Section */}
                            <div className="setting">
                                <label>Password</label>
                                 <div className="info">
                                     {isPasswordChangeMode ? (
                                         <>
                                         <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                         <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                         <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                        </>
                                        ) : (
                                            <span>********</span>
                                            )}
                                 </div>
                            </div>
                        </div>
                        {/* Fields for coaches */}
                        {isCoach && (
                            <div>
                                <div className="settings">
                                    <label>Price</label>
                                    {isEditMode ? (
                                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        ) : (
                                            <span>{price}</span>
                                            )}
                                </div>
                                 <div className="setting">
                                    <label>Qualification</label>
                                    {isEditMode ? (
                                        <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                                        ) : (
                                            <span>{qualification}</span>
                                            )}
                                </div>
                                <div className="setting">
                                    <label>Schedule</label>
                                     {isEditMode ? (
                                        <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                                        ) : (
                                             <span>{schedule}</span>
                                              )}
                                </div>
                                <div className="setting">
                                     <label>Specialization</label>
                                     {isEditMode ? (
                                        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                        ) : (
                                            <span>{specialization}</span>
                                            )}
                                </div>
                            </div>
                            )}
                            {/* Button Section */}
                             <div className="button-container">
                                {isPasswordChangeMode ? (
                                    <>
                                    <button type="submit" className="save-changes-button">
                                        Save New Password
                                    </button>
                                    <button type="button" className="cancel-button" onClick={() => setIsPasswordChangeMode(false)}>
                                        Cancel 
                                    </button>
                                    </>
                                    ) : isEditMode ? (
                                        <>
                                        <button type="button" className="save-changes-button" onClick={handleSubmit}>
                                             Save Changes
                                        </button>
                                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                        </>
                                        ) : (
                                            <>
                                             <button type="button" className="edit-profile-button" onClick={handleEditToggle}>
                                                Edit Profile
                                                </button>
                                                <button type="button" className="change-password-button" onClick={handlePasswordChangeMode}>
                                                    Change Password
                                                </button>
                                                <button type="button" className="delete-account-button" onClick={handleDeleteAccount}>
                                                    Delete Account
                                                </button>
                                            </>
                                            )}
                            </div>
                    </form>
                </div>
        </div>
    );
};

export default AccountSettings;