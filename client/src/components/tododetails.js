import React from 'react';
import axios from 'axios';

class Tododetails extends React.Component {
  state = {
    todoData: []
  };

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

  componentDidMount() {
    this.fetchTodoData();
  }

  render() {
    console.log(this.state.todoData);
    if (this.state.todoData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    }
    const todo = this.state.todoData.map(todos => (
      <div key={todos.todoId}>
        <h1>{todos.todoName}</h1>: 
        {todos.todoDetails} 
        {todos.dueDate} 
        <em><b>{todos.todoStatus}</b></em>
        </div>
    ));
    return <div>{todo}</div>;
  }
}

export default Tododetails;