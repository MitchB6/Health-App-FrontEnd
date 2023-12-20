// import React from "react";

const Description = ({ exercise }) => {
    return (
        <div className="description">
            <h2 className="desc">Description</h2>
            <h4 className="exercise-name">{exercise.name}</h4>
            <p>{exercise.description}</p>
        </div>
    );
};

export default Description;