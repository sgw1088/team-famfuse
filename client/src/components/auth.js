import axios from 'axios';
import React from 'react';
import { withRouter } from "react-router-dom";
import {jwt_decode} from 'jwt-decode';

class UserAuth extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedin: null
        }
    }
    auth(event) {
        console.log('auth')
        if(localStorage.userToken.length !== 0) {
            let token = localStorage.userToken;
            let decoded = jwt_decode(token)
            this.setState({
                isLoggedin: decoded.isLoggedin
            })
            console.log(this.state.isLoggedin)
            
        }
    }
}
export default withRouter(UserAuth);