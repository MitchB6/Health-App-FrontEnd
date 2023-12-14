import { NavLink } from 'react-router-dom';
import './components-styling/navbar.css';
import React from 'react';

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
                                <NavLink to="/coach">Find Coaches</NavLink>
                            </li>
                            <li>
                                <NavLink to="/account-settings">Account Settings</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav>
    )
}
export default Navbar