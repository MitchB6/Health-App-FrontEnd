import React, { useState } from 'react';
import CardModal from './CardModal.js';
import './components-styling/card.css';

const Card = ({ cardData, onSave }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAdd = () => {
        setModalOpen(true);
    };

    return (
        <div className='card'>
            <h3>{cardData.title}</h3>
            <button className="add-button" onClick={handleAdd}>+</button>
            {isModalOpen && (
                <CardModal onClose={() => setModalOpen(false)} onSave={onSave} />
            )}
        </div>
   
    );
};

export default Card;