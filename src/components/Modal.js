import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onEdit, workout_exercise_id, initialReps, initialSets, initialSequence, initialNotes }) => {
    const [editedReps, setEditedReps] = useState(initialReps);
    const [editedSets, setEditedSets] = useState(initialSets);
    const [editedSequence, setEditedSequence] = useState(initialSequence);
    const [editedNotes, setEditedNotes] = useState(initialNotes);

    const handleSaveChanges = () => {
        onEdit(workout_exercise_id, editedReps, editedSets, editedSequence, editedNotes);
    }

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Exercise</h2>
                <label>
                    Reps:
                    <input type="number" value={editedReps} onChange={(e) => setEditedReps(e.target.value)} />
                </label>
                <label>
                    Sets:
                    <input type="number" value={editedSets} onChange={(e) => setEditedSets(e.target.value)} />
                </label>
                <label>
                    Sequence:
                    <input type="number" value ={editedSequence} onChange={(e) => setEditedSequence(e.target.value)} />
                </label>
                <label>
                    Notes:
                    <input type="text" value={editedNotes} onChange={(e) => setEditedNotes(e.target.value)} />
                </label>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;