import React from "react";

const Sidebar = ({ categories, handleCategoryClick }) => {

    const reformatCategories = (inputString) => {
        const words = inputString.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }
    return (
        <div className="sidebar">
            <h2 className="categories">Categories</h2>
            <ul className="list-of-categories">
                {categories.map((category) => (
                    <li className="category" key={category} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;