import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import PhotoAlbum from './screens/PhotoAlbum';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Calendar from './screens/Calendar';
import Todos from './screens/Todos';
import Tododetails from './components/tododetails';



const MainMenu = () => {
  function logout(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
  }
  return (

  <div>
    <Link to="/">
      <button>Home</button>
    </Link>
    <Link to="/register">
      <button>Register</button>
    </Link>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/profile">
      <button>Profile</button>
    </Link>
    <Link to="/photoalbum">
      <button>Photo Album</button>
    </Link>
    <Link to="/todos">
      <button>ToDos</button>
    </Link>
    <Link to="/calendar">
      <button>Calendar</button>
    </Link>
    <button onClick={logout}>Logout</button>
   
  </div>
  );
};

class App extends Component {


  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to FamFuse!
          </p>
            <MainMenu />
        </header>
        
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/todos/:id" component={Tododetails} />
          <Route exact path="/photoalbum" component={PhotoAlbum} />
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
