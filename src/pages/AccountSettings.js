import React, { useState } from 'react';
import axios from 'axios';

const AccountSettings = () => {
    // States for user information
    const [profilePicture, setProfilePicture] = useState('path_to_user_image.jpg');
    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('user@example.com');
    const [phoneNumber, setPhoneNumber] = useState('(123) 456-7890');
    const [goals, setGoals] = useState(['Your current goal']);
    const [location, setLocation] = useState('Your current location');

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
            const response = await axios.post('/api/updateUserInfo', { name, email, goals, location, phoneNumber });
            setMessage('User information updated successfully!');
            console.log('Updated User Information:', response.data);
        } catch (error) {
            setMessage('Error updating user information.');
            console.error('Error:', error);
        }

        setIsEditMode(false);
    };

    // Handle phone number change
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    // Handle profile picture change
    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePicture(fileUrl);

            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                const response = await axios.post('/api/uploadProfilePicture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Image uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    };

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

    return (
        <div className="account-settings">
            <h1>Settings Page</h1>
            {message && <div className="feedback-message">{message}</div>}
            <form onSubmit={isPasswordChangeMode ? handlePasswordChange : handleSubmit}>
                {/* User Profile Section */}
                <div className="user-info">
                    <img src={profilePicture} alt="User" className="user-picture" />
                    {isEditMode && (
                        <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <span>{name}</span>
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <span>{email}</span>
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
                    ) : (
                        <span>{phoneNumber}</span>
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    ) : (
                        <span>{location}</span>
                    )}
                </div>

                {/* Goals Section */}
                {isEditMode && (
                    <div className="setting">
                        <label>Select Goals:</label>
                        {['Goal 1', 'Goal 2', 'Goal 3'].map(goalOption => (
                            <div key={goalOption}>
                                <input
                                    type="checkbox"
                                    checked={goals.includes(goalOption)}
                                    onChange={() => handleGoalChange(goalOption)}
                                />
                                {goalOption}
                            </div>
                        ))}
                    </div>
                )}

                {/* Password Change Section */}
                {isPasswordChangeMode && (
                    <>
                        <div className="setting">
                            <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="setting">
                            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="setting">
                            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                        <button type="submit">Save New Password</button>
                    </>
                )}

                {/* Edit and Password Change Toggles */}
                {!isPasswordChangeMode && (
                    <button type="button" onClick={handleEditToggle}>
                        {isEditMode ? 'Save Changes' : 'Edit Profile'}
                    </button>
                )}
                {!isEditMode && (
                    <button type="button" onClick={handlePasswordChangeMode}>
                        {isPasswordChangeMode ? 'Cancel' : 'Change Password'}
                    </button>
                )}

                {/* Account Deletion Section */}
                <button type="button" className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default AccountSettings;
