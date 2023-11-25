import React, { useState } from 'react';
import axios from 'axios'; 

const AccountSettings = () => {
    // States for user information
    const [profilePicture, setProfilePicture] = useState('path_to_user_image.jpg');
    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('user@example.com');
    const [goal, setGoal] = useState('Your current goal');
    const [location, setLocation] = useState('Your current location');

    // State for edit mode toggle
    const [isEditMode, setIsEditMode] = useState(false);

    // States for password change
    const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // State for notification preferences
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        appNotifications: true,
    });

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
        console.log('Updated User Information:', { name, email, goal, location });
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
            // Create a URL for the file for preview
            const fileUrl = URL.createObjectURL(file);
            setProfilePicture(fileUrl);

            // Prepare the image for upload
            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                // Send the image to the server
                const response = await axios.post('/api/uploadProfilePicture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Handle the response
                console.log('Image uploaded successfully:', response.data);
                // You might want to update the user's profile or state here
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    };

    // Toggle notification preferences
    const toggleNotification = (type) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            deleteAccount();
        }
    };

    // Function to make API call for account deletion
    const deleteAccount = async () => {
        try {
            const response = await axios.delete('/api/deleteAccount'); // Replace with your API endpoint
            console.log('Account deleted:', response.data);
            // Redirect user or perform other actions post-deletion
            // Example: window.location.href = '/goodbye'; 
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

                {/* User settings fields */}
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
                        <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
                    ) : (
                        <span>{goal}</span>
                    )}
                </div>
                <div className="setting">
                    {isEditMode ? (
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    ) : (
                        <span>{location}</span>
                    )}
                </div>

                {/* Notification Preferences - Only shown in edit mode */}
                {isEditMode && (
                    <div className="notification-settings">
                        <h2>Notification Preferences</h2>
                        <div className="setting" style={{ fontWeight: 'normal' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={notifications.emailNotifications}
                                    onChange={() => toggleNotification('emailNotifications')}
                                />
                                Email Notifications
                            </label>
                        </div>
                        <div className="setting" style={{ fontWeight: 'normal' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={notifications.appNotifications}
                                    onChange={() => toggleNotification('appNotifications')}
                                />
                                App Notifications
                            </label>
                        </div>
                    </div>
                )}

                {/* Password change fields */}
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

                {/* Edit and Change Password Buttons */}
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