import React from 'react';

import axios from 'axios';

class Users extends React.Component {
  state = {
    userData: []
  };

  fetchUserData = () => {
    var encodedURI = window.encodeURI(this.props.uri);
    return axios.get(encodedURI).then(response => {
      this.setState(() => {
        return {
          userData: response.data
        };
      });
    });
  };

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    console.log(this.state.userData);
    if (this.state.userData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    }
    const user = this.state.userData.map(users => (
      <div key={users.userId}>
        <em>{users.firstName}</em>: {users.username}
      </div>
    ));
    return <div>{user}</div>;
  }
}

export default Users;