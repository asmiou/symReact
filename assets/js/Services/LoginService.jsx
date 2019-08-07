import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {USERS_URL, LOGIN_URL} from '../config';

/**
 * Fonction de connexion
 * @param credentials
 * @returns {Promise<boolean>}
 */
function authentication(credentials){
    return axios.post(LOGIN_URL, credentials)
        .then(response => response.data.token)
        .then( token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = 'Bearer '+token;
            return true;
        });
}

/**
 *
 * @param user
 * @returns {Promise<AxiosResponse<T>>}
 */
function register(user) {
    return axios.post(USERS_URL, user);
}

/**
 * Fonction de déconnexion
 */
function logout() {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"];
}

/**
 * Configuration du site, vérifie si le token est valable ou pas
 */
function setup(){
    const token = window.localStorage.getItem('authToken')
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            axios.defaults.headers["Authorization"] = 'Bearer ' + token;
        }
    }
}

/**
 * Check si l'utilisateur est connecté
 * @returns {boolean}
 */
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
    register
}
