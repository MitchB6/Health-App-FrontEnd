import React, { useState } from 'react';

const Sidebar = ({ categories, onSelectCategory, exercises }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const handleCategoryClick = (category) => {
        console.log('Category clicked:', category);
        setExpandedCategory(category === expandedCategory ? null : category);
        setSelectedSubCategory(null);
    };

    const handleSubCategoryClick = (subCategory) => {
        console.log('Subcategory clicked:', subCategory);
        setSelectedSubCategory(subCategory);
        onSelectCategory(expandedCategory, subCategory);
    };

    const renderSubCategories = () => {
        const subCategories = expandedCategory === 'muscle_group'
        ? [...new Set(exercises.map((exercise) => exercise.muscle_group))]
        : [...new Set(exercises.map((exercise) => exercise.equipment))];

    return (
        <ul className='sidebar'>
            {subCategories.map((subCategory, index) => (
                <li key={index} onClick={() => handleSubCategoryClick(subCategory)}>
                    {subCategory}
                </li>
            ))}
        </ul>
 
    );

};

return (
    <div className='sidebar'>
        <h2 className='categories'>Categories</h2>
        <ul>
            {categories.map((category, index) => (
                <li key={index} onClick={() => handleCategoryClick(category)}>
                    {category}
                    {expandedCategory === category && renderSubCategories()}
                </li>
            ))}
        </ul>
    </div>
    
    );
 };
        
export default Sidebar;