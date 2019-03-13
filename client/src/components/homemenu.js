import React from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from '../logo.png';

const HomeMenu = () => {
    window.ondeforeunload = () => {
      localStorage.clear();
    }
    
    return (
  
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </div>
    );
  };

  export default withRouter(HomeMenu);