import React from 'react';
import jwt_decode from 'jwt-decode';

class ProfileComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            familyCode: ''
        }
    }
    componentDidMount() {
        const token = localStorage.usertoken
        console.log(token)
        if(token !== undefined) {
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            familyCode: decoded.familyCode
        })
    }
    }
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <h3>Name: </h3>
                <p>{this.state.firstName} {this.state.lastName}</p>
                <h3>Email: </h3>
                <p>{this.state.email}</p>
                <h3>Family Code: </h3>
                <p>{this.state.familyCode} </p>
            </div>
        )
    }
}
export default ProfileComponent;