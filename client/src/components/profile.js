import React from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

class ProfileComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            familyCode: '',
            image: null,
            url: ''
        }
   
    }
    componentWillMount() { 
        if(auth() === false) {
            this.props.history.push('/login');
        }
    }
    
    handleChange(event) {
       if(event.target.files[0]) {
           const image = event.target.files[0];
           this.setState({
               image
           })
       }
    }
    componentDidMount() {
        const token = localStorage.usertoken
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
                <div>
                    <h1>{this.state.firstName} {this.state.lastName}'s Profile</h1>
                    <p><b>Email: </b> {this.state.email}</p>
                    <p><b>Family Code:</b> {this.state.familyCode} </p>
                </div>
                
            </div>
        )
    }
}
export default withRouter(ProfileComponent);