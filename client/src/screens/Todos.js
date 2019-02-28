import React from 'react';
import Todos from '../components/todos';





const Todo = () => (
 
  <div>
     
   <div>
    <h1>To Do List</h1>
   
      <Todos uri="http://localhost:3001/users/todos" />
    
    </div>
    
    
</div>
 
);

export default Todo;