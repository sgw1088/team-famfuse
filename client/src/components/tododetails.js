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
  // fetchTodoData = () => {
  //   var encodedURI = window.encodeURI(this.props.uri);
  //   return axios.get(encodedURI).then(response => {
  //     this.setState(() => {
  //       return {
  //         todoData: response.data
  //       };
  //     });
  //   });
  // };

  componentDidMount() {
    this.fetchTodoData();
  }

  render() {
    console.log(this.state.todoData);
    if (this.state.todoData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    } else {
    //  const todo = this.state.todoData.map(todos => (
      
      return <div key={this.state.todoData.todoId}>
                <h1>{this.state.todoData.todoName}</h1>: 
                    {this.state.todoData.todoDetails} 
                    {this.state.todoData.dueDate} 
              <em><b>{this.state.todoData.todoStatus}</b></em>
        </div>
    // ));
  //   return <div>{todo}</div>;
   }
  }
}

export default Tododetails;