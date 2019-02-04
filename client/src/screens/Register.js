import React from 'react';

const Register = () => (
  <div>
    <div>
        <form id="signup" name="signup" method="POST" action="/users/register">
          <div>
              <label >First Name: </label>
              <input type="text" name="firstName" required></input>
          </div>
          <div>
              <label >Last Name: </label>
              <input type="text" name="lastName" required></input>
          </div>
          <div>
              <label >Email: </label>
              <input type="text" name="email" required></input>
          </div>
          <div>
            <label>Parent</label>
            <input type="radio" name="usertype" value="parent"></input><br /> 
            <label>Child</label>
            <input type="radio" name="usertype" value="child"></input> 
            
          </div>
          <div>
            <label>Create New Family: </label>
            <input type="checkbox" name="createfamily" value="true"></input>
          </div>
          <div>
            <label>Family Code: </label>
            <input type="text" name="familycode"></input>
          </div>
          <div>
              <label >Password: </label>
              <input type="text" name="password" required></input>
          </div>
          <div>
              <button type="submit">Submit</button>
          </div>
        </form>
      </div>
  </div>
  
);

export default Register;