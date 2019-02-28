import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import PhotoAlbum from './screens/PhotoAlbum';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Logout from './components/logout';
import Todos from './screens/Todos';
import Todochild from './screens/todoschild';
import Tododetails from './components/tododetails';





class App extends Component {
  

  render() {
    return (
      <Router>
      <div className="App">
   
       <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/todos" component={Todochild}/>
          <Route exact path="/todos/:id" component={Tododetails}  />
          <Route exact path="/photoalbum" component={PhotoAlbum} />
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
