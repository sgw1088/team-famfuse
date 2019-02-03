import React from 'react';
import Users from '../components/users';

const Home = () => (
  <div>
    <h2>Home</h2>
    <Users uri="http://localhost:3001/users" />
  </div>
);

export default Home;