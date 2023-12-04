 
import Navbar from "../components/navbar.js";
import "./styling/home.css";
//import Image from "../assets/banner-art-1.png";
import { NavLink } from "react-router-dom";
//import WeeklyWorkoutPlan from './pages/WeeklyWorkoutPlan.js'


const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="banner-container">
                <div className="message">
                    <h1>Fitness & Health</h1>
                    <h1>Start Here</h1>
                    <p>Plan Your Workouts. Find Coaches. Track Your Journey.</p>
                    <div className="button-container">
                    <NavLink to="/signup" className="custom-button">Sign Up</NavLink> or <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
                <div className="image-container">
                    <img src={Image} alt = "banner art" />
                </div>
            </div>
        </div>

    );
};

export default Home