import './components-styling/subcategories.css';

const Subcategories = ({ subcategories, handleSubcategoryClick }) => {

    if (!subcategories) {
        return null;
}
    return (
        <div className="subcategoriess-container">
            <table className="subcategories-table">
                <thead>
                    <tr>
                        <th colSpan="1">Types</th>
                    </tr>
                </thead>
                <tbody>
                    {subcategories.map((subcategory) => (
                        <tr className="subcategory" key={subcategory} onClick={() => handleSubcategoryClick(subcategory)}>
                            <td>{subcategory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subcategories;