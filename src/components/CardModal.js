import React, { useState } from "react";
import './components-styling/card.css';

const CardModal = ({ onClose, onSave }) => {
    const [userData, setUserData] = useState({
        q1: '',
        q2: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(userData);
        onClose();
    };
    return (
        <div className="card-modal-overlay">
        <div className="card-modal">
            <label>
                Q1: 
                <input type="text" name="label1" value={userData.q1} onChange={handleInputChange} />
            </label>
            <label>
                Q2:
                <input type="text" name="label2" value={userData.label2} onChange={handleInputChange} />
            </label>

            <div className="custom-button" onClick={handleSave}>Save</div>
            <div className="custom-button" onClick={onClose}>Cancel</div>
        </div>
        </div>
    );
};

export default CardModal;