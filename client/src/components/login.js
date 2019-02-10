import React from 'react';
import {login} from './userfunctions';

import { withRouter } from "react-router-dom";
class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    };
    handleChange(event) {
        this.setState({
           [event.target.name]: event.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res => {
            if(res) {
     
            this.props.history.push('/profile');
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <form id="login-form" noValidate onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" class="form-control" placeholder="Email" aria-describedby="helpId" value={this.state.email} onChange={this.handleChange}></input>
                </div>
                <div class="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" class="form-control" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        )
    }
}

export default withRouter(LoginForm);