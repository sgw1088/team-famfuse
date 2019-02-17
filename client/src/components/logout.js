import React from 'react';
import { withRouter } from "react-router-dom";


class Logout extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    };
    logout = async event => {
        localStorage.removeItem('usertoken');
        this.props.history.push('/login');
    }
    render() {
        return(
       <button onClick={this.logout}>Logout</button>
        )
    }
}
export default withRouter(Logout);