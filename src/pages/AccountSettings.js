import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './styling/AccountSettings.css';
import Navbar from "../components/navbar.js";

const AccountSettings = () => {
    const [first_name, setFirstName] = useState('First Name');
    const [last_name, setLastName] = useState('Last Name');
    const [birthdate, setBirthDate] = useState(''); 
    const [gender, setGender] = useState('Gender');
    const [email, setEmail] = useState('user@example.com');
    const [phone, setPhone] = useState('(123) 456-7890');

    // Separate state for city, state, and zipCode
    const [city, setCity] = useState('City');
    const [state, setState] = useState('State');
    const [zip_code, setZipCode] = useState('12345');

    // States for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken || !refreshToken) {
         console.log('No access token or refresh token');
          return;
          }
        if (!email.includes('@')) {
            setMessage('Please enter a valid email address.');
            return;
        }
        if (phone && phone.length < 10) {
            setMessage('Please enter a valid phone number.');
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.put(`${apiUrl}/member/settings`, {
                first_name,
                last_name, 
                birthdate,
                gender,
                email,
                phone,
                city,
                state,
                zip_code,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setMessage('User information updated successfully!');
        } catch (error) {
            setMessage('An error occurred.');
            console.error('Error:', error);
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
         const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setMessage('No access token');
            return;
        }
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/auth/change_password`, {
                old_password: currentPassword,
                new_password: newPassword,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // Handle response
            setMessage("Password successfully changed!");
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            // Handle error
            setMessage('An error occurred.');
            console.error('Error:', error);
        }
    };
    const handleCancelEdit = () => {
        // Resetting state variables to their defaults or initial values
        setFirstName('First Name');
        setLastName('Last Name');
        setBirthDate('yyyy-MM-dd');
        setGender('Gender');
        setEmail('user@example.com');
        setPhone('(123) 456-7890');
        // ... reset other state variables as needed ...
    
        // Disabling edit mode
        setIsEditMode(false);
    
        // Clearing any messages
        setMessage('');
    };
    // Handle phone number change
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
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
                <label>First Name</label>
                {isEditMode ? (
        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
    ) : (
        <span>{first_name}</span>
    )}
</div>
<div className="setting">
    <label>Last Name</label>
    {isEditMode ? (
        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
    ) : (
        <span>{last_name}</span>
    )}
                </div>
                <div className="setting">
                    <label>Birth Date</label>
                    {isEditMode ? (
                        <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthDate(e.target.value)}/>
                        ) : (
                            <span>{birthdate}</span>
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
                        <input type="tel" value={phone} onChange={handlePhoneChange} />
                        ) : (
                            <span>{phone}</span>
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
                             <input type="text" placeholder="Zip Code" value={zip_code} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                        </>
                        ) : (
                            <span>{`${city}, ${state} ${zip_code}`}</span>
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