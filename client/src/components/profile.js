import React from 'react';
import jwt_decode from 'jwt-decode';
import { imageUpload } from './userfunctions';

class ProfileComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            familyCode: '',
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
           file: event.target.files[0]
        })
    }
    onSubmit(event) {
        event.preventDefault()
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const image = {
            userId: decoded.userId,
            familyCode: decoded.familyCode,
            image: this.state.file
        }
        console.log(image)
        imageUpload(image)
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
                <div>
                    <h1>Profile</h1>
                    <h3>Name: </h3>
                    <p>{this.state.firstName} {this.state.lastName}</p>
                    <h3>Email: </h3>
                    <p>{this.state.email}</p>
                    <h3>Family Code: </h3>
                    <p>{this.state.familyCode} </p>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                          <label htmlFor="Image">Upload Photo</label>
                          <input type="file" class="form-control-file" onChange={this.handleChange} name="file" id="image"></input>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default ProfileComponent;