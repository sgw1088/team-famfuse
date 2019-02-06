import React from 'react';
import {login} from './userfunctions';


class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
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
            console.log(res)
            }
        })
    }
    render() {
        return (
            <form id="login-form" noValidate onSubmit={this.onSubmit}>
                <div>
                  <label htmlFor="email">Email: </label>
                  <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                </div>
                <button type="submit">Login</button>
            </form>
        )
    }
}
export default LoginForm;