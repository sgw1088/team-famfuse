import React from 'react';
import ProfileComponent from '../components/profile';
import UserMenu from '../components/usermenu';

const Profile = () => (
  <div>
    <div>
  <UserMenu />
  </div>
  <div>
    <ProfileComponent />    
  </div>
  </div>
);

export default Profile;