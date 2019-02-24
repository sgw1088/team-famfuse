import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

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
  componentWillMount() { 
    if(auth() === false) {
        this.props.history.push('/login');
    }
}
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
       <Link to={{pathname:`todos/${todos.todoId}` }}><p><b>{todos.todoName}</b>: {todos.todoStatus}</p></Link></div>
     
     
    ));
    return <div>{todo}</div>;
  }
}

export default withRouter(Todos);