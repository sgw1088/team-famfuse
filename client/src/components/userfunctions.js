import axios from 'axios';

const server = "http://localhost:3001/";
export const login = user => {
    return axios
    .post(server + 'users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
        
    })
    .catch(err => {
        console.log(err)
    })
}

export const register = user => {
    return axios
    .post(server + 'users/register', {
        firstName: user.firstName,
        lastName: user.lastName,
        familyCode: user.familyCode,
        email: user.email,
        password: user.password,
        childUser: user.childUser,
        parentUser: user.parentUser
    })
    .then(res => {
        if (res === 'this user already exists') {
            alert('This email is already connected to an account. Please login')
        } else {
            localStorage.setItem('usertoken', res.data)
            return res.data
        }
    })
    .catch(err => {
        console.log(err)
    })
}
export const imageUpload = post => {
    console.log(post)
    return axios
    
    .post(server + 'newimage', {
        userId: post.userId,
        familyCode: post.familyCode,
        image: post.image
    })
    
}

export const fetchFamilyImages = (familyCode, userId) => {
    
    return axios
    .post(server + 'familyphotos', {
        familyCode: familyCode,
        userId: userId

    }).then(res => {
        return res.data;
    })
}
export const fetchMyImages = user => {
    
    return axios
    .post(server + 'myphotos', {
        userId: user

    }).then(res => {
        return res.data;
    })
}