import React from 'react';
import axios from 'axios';

class Tododetails extends React.Component {
  state = {
    todoData: {}
  };
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

  componentDidMount() {
    this.fetchTodoData();
  }

  

  render() {
    console.log(this.state.todoData);
    if (this.state.todoData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    } else {
  
      return <div key={this.state.todoData.todoId}>
                <h1>{this.state.todoData.todoName}</h1>: 
                    {this.state.todoData.todoDetails} 
                    {this.state.todoData.dueDate} 
              <b>{this.state.todoData.todoStatus}</b>
             
<form action="/users/todos/:id" method="PUT" >
  <div>
      <label for="name">To Do Name: </label>
      <input type="text" name="todoName" id="todoName" value={this.state.todoData.todoName} />
  </div>
  <div>
      <label for="name">Details: </label>
      <input type="text" name="todoDetails" id="todoDetails" value={this.state.todoData.todoDetails}  />
  </div>
  <div>
      <label for="name">Due Date: </label>
      <input type="text" name="dueDate" id="dueDate" value={this.state.todoData.dueDate} />
  </div>
  <div>
      <label for="name">Status: </label>
      <input type="text" name="todoStatus" id="todoStatus" value={this.state.todoData.todoStatus}  />
  </div>
  <div>
      <button type="submit" id="submitButton">Update To Do</button>
  </div>
</form>
        </div>
   
   }
  }
}

export default Tododetails;