import React from 'react';
import Todoschild from '../components/todoschild';
import UserMenu from '../components/usermenu';





const Todochild = () => (
 
  <div>
     <UserMenu />
   <div>
    <h1>To Do List</h1>
   
      <Todoschild uri="http://localhost:3001/users/profile/:id/todos" />
    
    </div>
    
 
</div>
 
);

export default Todochild;