import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authentication(credentials){
    return axios.post('http://localhost:8000/api/login_check', credentials)
        .then(response => response.data.token)
        .then( token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = 'Bearer '+token;
            return true;
        });
}

function logout() {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"];
}

function setup(){
    const token = window.localStorage.getItem('authToken')
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            axios.defaults.headers["Authorization"] = 'Bearer ' + token;
        }/*else{
            logout();
        }*/
    }
}

function isAuthenticate(){
    const token = window.localStorage.getItem('authToken');
    if(token){
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        } else {
            logout();
            return false;
        }
    }
    return false;
}

export default {
    authentication,
    logout,
    setup,
    isAuthenticate,
}
