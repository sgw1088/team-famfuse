
import jwt_decode from 'jwt-decode';

const auth = () => {
        console.log('auth')
        if (localStorage.usertoken) {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            if (decoded.isLoggedIn !== true) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    

export default auth;