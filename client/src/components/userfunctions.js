import axios from 'axios';

export const login = user => {
    return axios
    .post('http://localhost:3001/users/login', {
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
    .post('http://localhost:3001/users/register', {
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