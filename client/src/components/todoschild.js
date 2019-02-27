import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class Todoschild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoData: [],
            
          };
    }
    
    fetchUserData() {
        const token = localStorage.usertoken
        if(token !== undefined) {
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            familyCode: decoded.familyCode,
            userId: decoded.userId,
            childUser: decoded.childUser,
            parentUser: decoded.parentUser,
        })
    }
}
  
    fetchTodoData = () => {
      var encodedURI = window.encodeURI(this.props.uri);
      return axios.get(encodedURI).then(response => {
        this.setState(() => {
          return {
            todoData: response.data
          };
        });
      });
    };
  
  
    componentWillMount() { 
      if(auth() === false) {
          this.props.history.push('/login');
      }
  }
    componentDidMount() {
      this.fetchTodoData();
      this.fetchUserData()
    }
  
    render() {
      console.log(this.state.todoData);
      console.log(this.state.firstName);
      console.log(this.state.userId)
      if (this.state.todoData.length === 0) {
        return <div>Failed to fetch data from server</div>;
      }
         

      const todo = this.state.todoData.map(todos => (
       
        <div key={todos.todoId}>
         <Link to={{pathname:`todos/${todos.todoId}` }}><p><b>{todos.userId} - {todos.todoName}</b>: {todos.todoStatus}</p></Link></div>
         
       
      ));
      return (
      <div>Welcome to your to do list {this.state.firstName}
      {todo}
      <h1>Add a To Do Item!</h1>
<div>
<form action="/users/todos" method="POST">
<div>
        <label htmlFor="userId">User Id: </label>
        <input type="text" name="userId" defaultValue={this.state.userId}></input>
    </div>
    <div>
        <label htmlFor="todoName">To Do Name: </label>
        <input type="text" name="todoName"></input>
    </div>
    <div>
        <label htmlFor="todoDetails">To Do Details: </label>
        <input type="text" name="todoDetails"></input>
    </div>
    <div>
        <label htmlFor="dueDate">Due Date: </label>
        <input type="text" name="dueDate"></input>
    </div>
    <div>
        <label htmlFor="todoStatus">Status </label>
        <select type="text" name="todoStatus">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        </select>
    </div>
    <div>
        <button type="submit">Create To Do</button>
    </div>
</form>
</div>
      </div>
      )
    }
  }
  
  export default withRouter(Todoschild);