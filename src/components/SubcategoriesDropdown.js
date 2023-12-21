
const SubcategoriesDropdown = ({ subcategories, handleSubcategoryClick }) => {
    if (!subcategories) {
        return null;
    }

    return (
        <label>
            Choose a Subcategory: 
            <select onChange={(e) => handleSubcategoryClick(e.target.value)}>
                <option value="" enabled>Select Subcategory</option>
                {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                        {subcategory}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SubcategoriesDropdown;