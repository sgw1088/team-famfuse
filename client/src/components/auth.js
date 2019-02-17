import axios from 'axios';
import React from 'react';
import { withRouter } from "react-router-dom";
import {jwt_decode} from 'jwt-decode';
class UserAuth extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    auth(event) {
        console.log('auth')
        if(localStorage.userToken.length !== 0) {
            let token = localStorage.userToken;
            let decoded = jwt_decode(token)
            this.setState({
                email: decoded.email,
                password: decoded.password
            })
            return axios 
            .post("http://localhost:3001/users/checkauth", {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                if(res.data !== null) {
                    this.props.history.push()
                }
            })
        }
    }
}
export default withRouter(UserAuth);