import React, { useState } from 'react';
import axios from 'axios'; 

const AccountSettings = () => {
    // States for user information
    const [profilePicture, setProfilePicture] = useState('path_to_user_image.jpg');
    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('user@example.com');
    const [goals, setGoals] = useState(['Your current goal']); // Changed to an array for multiple goals
    const [location, setLocation] = useState('Your current location');

    // State for edit mode toggle
    const [isEditMode, setIsEditMode] = useState(false);

    // States for password change
    const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Toggle edit mode
    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
        if (isPasswordChangeMode) setIsPasswordChangeMode(false);
    };

    // Toggle password change mode
    const handlePasswordChangeMode = () => {
        setIsPasswordChangeMode(!isPasswordChangeMode);
        if (isEditMode) setIsEditMode(false);
    };

    // Submit user info
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Updated User Information:', { name, email, goals, location });
        setIsEditMode(false);
    };

    // Submit password change
    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }
        console.log('Password Changed:', { currentPassword, newPassword });
        alert("Password successfully changed!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsPasswordChangeMode(false);
    };

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

    const handleGoalChange = (selectedGoal) => {
        setGoals(prevGoals => {
            if (prevGoals.includes(selectedGoal)) {
                return prevGoals.filter(goal => goal !== selectedGoal);
            } else {
                return [...prevGoals, selectedGoal];
            }
        });
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            deleteAccount();
        }
    };

    const deleteAccount = async () => {
        try {
            const response = await axios.delete('/api/deleteAccount');
            console.log('Account deleted:', response.data);
        } catch (error) {
            console.error('Error deleting the account:', error);
        }
    };

    return (
        <div className="account-settings">
            <h1>Settings Page</h1>
            <form onSubmit={isPasswordChangeMode ? handlePasswordChange : handleSubmit}>
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
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    ) : (
                        <span>{location}</span>
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <>
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
                        </>
                    ) : (
                        <span>{goals.join(', ')}</span>
                    )}
                </div>
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

                {!isPasswordChangeMode && (
                    <button type="button" onClick={handleEditToggle}>
                        {isEditMode ? 'Save Changes' : 'Edit'}
                    </button>
                )}
                {!isEditMode && (
                    <button type="button" onClick={handlePasswordChangeMode}>
                        {isPasswordChangeMode ? 'Cancel' : 'Change Password'}
                    </button>
                )}
                <button type="button" className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default AccountSettings;
