import axios from 'axios';
let URL = 'http://localhost:8000/api/customers';
/**
 * Fetch all customers from database
 * @returns {Promise<AxiosResponse<T>>}
 */
function findAll(){
    return axios.get(URL)
        .then( response => response.data['hydra:member']);
}

/**
 * Remove customer from database
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
function del(id){
    return axios.delete(URL+`/${id}`);
}

/**
 * Add customer in database
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function add(data) {
    return axios.post(URL,data)

}

/**
 * Fetch one customer by id
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
function findById(id){
    return axios.get(URL+`/${id}`)
        .then(response => response.data);
}

/**
 * Update customer information
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function edit(id, data){
    return axios.put(URL+`/${id}`,data)
        .then(response => response.data);
}

export default {
    findAll,
    del,
    add,
    findById,
    edit
}
