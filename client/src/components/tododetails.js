import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

class Tododetails extends React.Component {
  state = {
    todoData: {}
  };
  componentWillMount() { 
    if(auth() === false) {
        this.props.history.push('/login');
    }
}
    fetchTodoData = () => {
      let todoId = this.props.match.params.id
      return axios
      .get("http://localhost:3001/users/todos/" + todoId )
      .then(res => {
        this.setState({
          todoData: res.data
        })
      })
    }

    onSubmit = (e) => {
      e.preventDefault();
      const todoId = this.props.match.params.id;
      const todoName = document.getElementById('todoName').value;
      const todoDetails = document.getElementById('todoDetails').value;
      const dueDate = document.getElementById('dueDate').value;
      const todoStatus = document.getElementById('todoStatus').value;
      $.ajax({
        url: '/users/todos/' + todoId,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ todoName: todoName, todoDetails: todoDetails,
          dueDate: dueDate, todoStatus: todoStatus }),
        method: 'PUT', complete: () => window.location.reload()
    })
  }

  onDelete = (e) => {
    e.preventDefault();
    const todoId = this.props.match.params.id;
    $.ajax({
      url: '/users/todos/' + todoId + '/delete',
      method: 'DELETE', complete: () => window.location = "/todos/"
  })
  }

  componentDidMount() {
    this.fetchTodoData();
  } 


  render() {
    console.log(this.state.todoData);
    if (this.state.todoData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    } else {
  
      return <div key={this.state.todoData.todoId}>  
  <div>
    <h3>Up Date This To Do</h3>
    <form onSubmit={this.onSubmit}>
 <div>
     <label htmlFor="todoName">To Do Name: </label>
     <input type="text" name="todoName" id="todoName" defaultValue={this.state.todoData.todoName} />
 </div>
 <div>
     <label htmlFor="todoDetails">Details: </label>
     <input type="text" name="todoDetails" id="todoDetails" defaultValue={this.state.todoData.todoDetails}  />
 </div>
 <div>
     <label htmlFor="dueDate">Due Date: </label>
     <input type="text" name="dueDate" id="dueDate" defaultValue={this.state.todoData.dueDate} />
 </div>
 <div>
     <label htmlFor="todoStatus">Status: </label>
     <input type="text" name="todoStatus" id="todoStatus" defaultValue={this.state.todoData.todoStatus}  />
 </div>
 <div>
     <button type="submit" id="submitButton">Update</button>
    <button onClick={this.onDelete} type="deleteButton" id="deleteButton">Delete</button>
  </div>

</form>
  </div>
</div>
   
   }
  }
}

export default withRouter(Tododetails);