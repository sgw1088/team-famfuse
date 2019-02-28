import React from 'react';
import jwt_decode from 'jwt-decode';
import { imageUpload, fetchFamilyImages, fetchMyImages } from './userfunctions';
import {storage} from '../firebase/index';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

class PhotoAlbumComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: '',
            familyCode: '',
            image: null,
            url: '',
            familyImages: [],
            myImages: [],
            uploadImages: null,
            upload: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
    onSubmit(event) {
        event.preventDefault()
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${this.state.familyCode}${image.name}`).put(image)
        uploadTask.on('state_changed', 
        (snapshot) => {
            //progress function
        },
        (error) => {
            //error function
            console.log(error)
        }, 
        () => {
            //complete function
            storage.ref('images').child(this.state.familyCode + image.name).getDownloadURL().then(url => {
                this.setState({
                    url: url
                })
                const imageUrl = this.state.url;
                const token = localStorage.usertoken
                const decoded = jwt_decode(token)
                const post = {
                    password: decoded.password,
                    userId: decoded.userId,
                    familyCode: decoded.familyCode,
                    image: imageUrl
                }
        
                imageUpload(post)
                fetchMyImages(decoded.userId).then(res => {
                    this.setState({
                        myImages: res
                    })
                })          
            })
        
        })
    }

    componentDidMount() {
        const token = localStorage.usertoken
        if(token !== undefined) {
        const decoded = jwt_decode(token)
        this.setState({
            userId: decoded.userId,
            familyCode: decoded.familyCode
        })
        fetchFamilyImages(decoded.familyCode, decoded.userId).then(res => {
            this.setState({
                familyImages: res
            })
        })
        fetchMyImages(decoded.userId).then(res => {
            this.setState({
                myImages: res
            })
        })          
    }
}



    
    render() {
        const myImage = this.state.myImages.map(myImages => (
            <div className="imageCon" key={myImages.imageId}>
                <img className="familyPhotos" src={myImages.file}></img>
            </div>
            ));
        const familyImage = this.state.familyImages.map(familyImages => (
            <div className="imageCon" key={familyImages.imageId}>
                <img className="familyPhotos" src={familyImages.file}></img>
            </div>
            ));
            
        return (
            <div>
                 <div>
                 <div className="card-container"> 
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="Image"><h1>Upload Photo</h1></label><br />
                    <input type="file" className="form-control-file" onChange={this.handleChange} name="file" id="image" required></input>
                </div>
                <button type="submit" >Submit</button>
            </form>
        </div>
        <br />
                </div>
            <div className="photo-container">
                <h1>My Photos</h1>
                <div className="familyImgsCon">
                    {myImage}
                </div>
                </div>
                <br />
                <div className="photo-container">
                <h1>My Family's Photos</h1>
                <div className="familyImgsCon">
                    {familyImage}
                </div>
                </div>
            </div>
        )
    }

}
export default withRouter(PhotoAlbumComponent);