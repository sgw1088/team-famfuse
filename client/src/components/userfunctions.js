import axios from 'axios';
import { withRouter } from "react-router-dom";
import {jwt_decoded} from "jwt-decode";
const server = "http://localhost:3001/";

//Login and Logout
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


//Register
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

//Photo Album
export const imageUpload = post => {
    
    return axios
    .post(server + 'newimage', {
        userId: post.userId,
        familyCode: post.familyCode,
        image: post.image
    })
    
}
 export const checkAuth = (password) => {
    const token = localStorage.userToken;
    const decoded = jwt_decoded(token);
    if(decoded.password === password) {
        return true;
    }

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

//Todos 
export const fetchTodos = userId => {
    return axios
    .post(server + 'users/usertodos', {
        userId: userId
    }).then(res => {
        console.log(res.data)
        return res.data;
        
    })
}
export const newTodo = todo => {
    return axios
    .post(server + 'users/todos', {
        userId: todo.userId,
        todoName: todo.todoName,
        todoDetails: todo.todoDetails,
        dueDate: todo.dueDate
    })
}
