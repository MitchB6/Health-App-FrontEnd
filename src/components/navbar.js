import { NavLink } from 'react-router-dom';
import React from 'react';

import './components-styling/navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='container'>
                <div className='app-name'>
                    <NavLink to="/">FITintoTHIS</NavLink>
                </div>
                    <div className='nav-elements'>
                        <ul>
                            <li>
                                <NavLink to="/workout-notebook">Notebook</NavLink>
                            </li>
                            <li>
                                <NavLink to="/statistic-logger">Statistics</NavLink>
                            </li>
                            <li>
                                <NavLink to="/exercise-bank">Exercises</NavLink>
                            </li>

                            <li>
                                <NavLink to="/coach">Find Coaches</NavLink>
                            </li>
                            <li>
                                <NavLink to="/coach-page">Dashboard</NavLink>
                            </li>
                           
                         
                        </ul>
                    </div>
                </div>
        </nav>
    )
}
export default Navbar