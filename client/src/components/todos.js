import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import { fetchTodos, newTodo } from './userfunctions';

class Todos extends React.Component {
  constructor() {
  super()
  this.state = {
    todoData: [],
    userId: '',
    todoName: '',
    todoDetails: '',
    dueDate: ''
  }
  this.handleChange = this.handleChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)
};
handleChange(event) {
  this.setState({
     [event.target.name]: event.target.value
  })
}
  componentWillMount() { 
    if(auth() === false) {
        this.props.history.push('/login');
    }
}
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    fetchTodos(decoded.userId)
    .then(res => {
      console.log(res)
      this.setState({
        todoData: res
      })
      console.log(this.todoData);
    });
  }
  onSubmit(event) {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    event.preventDefault()
        let user = {
          userId: decoded.userId,
          todoName: this.state.todoName,
          todoDetails: this.state.todoDetails,
          dueDate: this.state.dueDate
        }
        newTodo(user);
      }
    

  render() {
    console.log(this.state.todoData);
    if (this.state.todoData.length === 0) {
      return <div>Failed to fetch data from server
</div>
        ;
    }
    
    const todo = this.state.todoData.map(todos => (
     <div>
      <div key={todos.todoId}>
       <Link to={{pathname:`todos/${todos.todoId}` }}><p><b>{todos.userId}{todos.todoName}</b>: {todos.todoStatus}</p></Link></div>
       
       </div>
     
     
    ));
    return <div>
      <div>{todo}</div>
      <div>
    <form onSubmit={this.onSubmit}>
<div>
   <label htmlFor="todoName">To Do Name: </label>
   <input type="text" name="todoName" onChange={this.handleChange}></input>
</div>
<div>
   <label htmlFor="todoDetails">To Do Details: </label>
   <input type="text" name="todoDetails" onChange={this.handleChange}></input>
</div>
<div>
   <label htmlFor="dueDate">Due Date: </label>
   <input type="text" name="dueDate" onChange={this.handleChange}></input>
</div>
<div>
   <button type="submit">Create To Do</button>
</div>
</form>
  </div>
  
  </div>;
  }
}

export default withRouter(Todos);