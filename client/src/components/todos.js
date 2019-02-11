import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';


class Todos extends React.Component {
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
       <Link to={{pathname:`todos/${todos.todoId}` }}><h3>{todos.todoId} - {todos.todoName}:</h3></Link>
        <p>{todos.todoStatus}</p>
      </div>
     
    ));
    return <div>{todo}</div>;
  }
}

export default Todos;