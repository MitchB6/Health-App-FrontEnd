import React from 'react';

const CategoriesDropdown = ({ categories, handleCategoryClick }) => {

    const reformatCategories = (inputString) => {
        const words = inputString.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }
    return (
        <label>
            Choose a Category:
            <select onChange={(e) => handleCategoryClick(e.target.value)}>
                <option value="" disabled>Select a Category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {reformatCategories(category)}
                    </option>
                ))}
            </select>
        </label>

    );
};

export default CategoriesDropdown;
