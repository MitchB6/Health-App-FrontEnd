
// import React from 'react';
import { Link } from 'react-router-dom';

const AuthSwitcher = ({ isLogin, onSwitch }) => (
  <div>
    {isLogin ? (
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    ) : (
        <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    )}
  </div>
);

export default AuthSwitcher;
