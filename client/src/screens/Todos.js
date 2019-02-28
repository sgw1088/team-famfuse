import React from 'react';
import Todos from '../components/todos';
import UserMenu from '../components/usermenu';





const Todo = () => (
 
  <div>
       <div>
  <UserMenu />
  </div>
   <div>
    <h1>To Do List</h1>
   
      <Todos uri="http://localhost:3001/users/todos" />
    
    </div>
    
    
</div>
 
);

export default Todo;