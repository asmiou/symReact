import axios from 'axios';
let URL = 'http://localhost:8000/api/invoices';

/**
 * Fetch all invoices from database
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
 * Fetch one customer by id
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
function findById(id){
    return axios.get(URL+`/${id}`)
        .then(response => response.data);
}
/**
 * Add customer in database
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function add(data) {
    const invoice = {...data, customer:`/api/customers/${data.customer}`}
    return axios.post(URL,invoice)

}
/**
 * Update customer information
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function edit(id, data){
    const invoice = {...data, customer:`/api/customers/${data.customer}`}
    return axios.put(URL+`/${id}`,invoice)
        .then(response => response.data);
}

export default {
    findAll,
    del,
    findById,
    add,
    edit
}
