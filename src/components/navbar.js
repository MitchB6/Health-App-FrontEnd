import { NavLink } from 'react-router-dom';
import './components-styling/navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='container'>
                <div className='app-name'>
                    Fitness & Health
                </div>
                    <div className='nav-elements'>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/workout-notebook">Notebook</NavLink>
                            </li>
                            <li>
                                <NavLink to="/statistic-logger">Statistics</NavLink>
                            </li>

                            <li>
                                <NavLink to="/coaches">Find Coaches</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav>
    )
}
export default Navbar