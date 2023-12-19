import React from "react";

const Subcategories = ({ subcategories, handleSubcategoryClick }) => {

    if (!subcategories) {
        return null;
}
    return (
        <div className="subcategories-container">
            <h2 className="subcategory">Subcategories</h2>
            <ul className="list-of-subcategories">
                {subcategories.map((subcategory) => (
                    <li className="subcategory" key={subcategory} onClick={() => handleSubcategoryClick(subcategory)} >
                        {subcategory}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subcategories;