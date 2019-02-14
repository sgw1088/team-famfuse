import React from 'react';
import Todos from '../components/todos';





const Todo = () => (
 
  <div>
     
   <div>
    <h1>To Do List</h1>
   
      <Todos uri="http://localhost:3001/users/todos" />
    
    </div>
    
    <h1>Add a To Do Item!</h1>
<div>
<form action="/users/todos" method="POST">
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
        <button type="submit">Create To Do</button>
    </div>
</form>
</div>
</div>
 
);

export default Todo;