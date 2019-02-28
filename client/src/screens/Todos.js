import React from 'react';
import Todos from '../components/todos';
import UserMenu from '../components/usermenu';
import usermenu from '../components/usermenu';





const Todo = () => (
 
  <div>
       <div>
  <UserMenu />
  </div>
   <div>
    
   
      <Todos uri="http://localhost:3001/users/usertodos" />
    
    </div>
    
    
</div>
 
);

export default Todo;