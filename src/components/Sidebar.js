import './components-styling/sidebar.css';

const Sidebar = ({ categories, handleCategoryClick }) => {

    const reformatCategories = (inputString) => {
        const words = inputString.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }
    return (
        <div className="sidebar">
            <table className="categories-table-container">
                <thead>
                    <tr>
                        <th colSpan="1">Filters</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr className="category" key={category} onClick={() => handleCategoryClick(category)}>
                            <td>{reformatCategories(category)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        
        </div>
    );
};

export default Sidebar;