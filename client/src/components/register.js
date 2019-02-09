import React from 'react';
import {register} from './userfunctions';

class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            familyCode: '',
            email: '',
            password: '',
            childUser: '',
            parentUser: '',
            createFamily: ''
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
        let user = {};
        if(this.state.parentUser === 'parent' && this.state.createFamily === 'createFamily') {
            user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                familyCode: Math.random().toString(36).substr(2, 9) + this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                childUser: this.state.childUser,
                parentUser: this.state.parentUser,
                createFamily: this.state.createFamily
            } 
        } else {
            user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                familyCode: this.state.familyCode,
                email: this.state.email,
                password: this.state.password,
                childUser: this.state.childUser,
                parentUser: this.state.parentUser,
                createFamily: this.state.createFamily
            }
        }
        alert('This is your family code. Share this with your family to link your family. ' + user.familyCode)
        register(user).then(res => {
            if(res) {
            console.log(res)
            }
        })
    }
    render() {
        return (
            <form id="signup" name="signup" noValidate onSubmit={this.onSubmit}>
          <div>
              <label htmlFor="firstName">First Name: </label>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
          </div>
          <div>
              <label htmlFor="lastName">Last Name: </label>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
          </div>
          <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required></input>
          </div>
          <div>
            <label>Parent</label>
            <input type="checkbox" name="parentUser" value="parent" checked={this.state.parentUser === "parent"} onChange={this.handleChange}></input><br /> 
            <label>Child</label>
            <input type="checkbox" name="childUser" value="child" checked={this.state.childUser === "child"} onChange={this.handleChange}></input> 
            
          </div>
          <div>
            <label>Create New Family: </label>
            <input type="checkbox" name="createFamily" value="createFamily" checked={this.state.createFamily === "createFamily"} onChange={this.handleChange}></input>
          </div>
          <div>
            <label htmlFor="familyCode">Family Code: </label>
            <input type="text" name="familyCode" value={this.state.familyCode} onChange={this.handleChange}></input>
          </div>
          <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} required></input>
          </div>
          <div>
              <button type="submit">Submit</button>
          </div>
        </form>
        )
    }
}
export default RegisterForm;