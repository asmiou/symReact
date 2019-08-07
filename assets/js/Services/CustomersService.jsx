import axios from 'axios';
import CacheService from "./CacheService";
import {CUSTOMER_URL} from '../config';
let URL = CUSTOMER_URL;
/**
 * Fetch all customers from database
 * @returns {Promise<AxiosResponse<T>>}
 */
async function findAll(){
    const cachedCustomers = await CacheService.get('customers');
    if(cachedCustomers) return cachedCustomers;

    return axios.get(URL)
        .then( response => {
            const customers = response.data['hydra:member'];
            CacheService.set('customers', customers);
            return customers;
        });
}

/**
 * Remove customer from database
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
function del(id){
    return axios.delete(URL+`/${id}`).then(async response =>{
        const cachedCustomers = await CacheService.get('customers');
        if(cachedCustomers){
            cachedCustomers.set('customers',cachedCustomers.filter(c => c.id !== id));
        }

        return response;
    });
}

/**
 * Add customer in database
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function add(data) {
    return axios.post(URL,data).then(async response =>{
        const cachedCustomers = await CacheService.get('customers');
        if(cachedCustomers){
            cachedCustomers.set('customers',[...cachedCustomers, response.data]);
        }

        return response;
    });

}

/**
 * Fetch one customer by id
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
async function findById(id){
    const cachedCustomer = await CacheService.get('customer.'+id);
    if(cachedCustomer) return cachedCustomer;

    return axios.get(URL+`/${id}`)
        .then(response => {
            const customer = response.data;
            CacheService.set('customer.'+id,customer);
            return customer;
        });
}

/**
 * Update customer information
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function edit(id, data){
    return axios.put(URL+`/${id}`,data).then(async response =>{
        const cachedCustomers = await CacheService.get('customers');
        const cachefCustomer = await CacheService.get('customer.'+id);

        if(cachefCustomer){
            CacheService.set('customer.'+id, response.data);
        }

        if(cachedCustomers){
            const index = cachedCustomers.findIndex(c => c.id === id);
            cachedCustomers[index] = response.data;
            cachedCustomers.set('customers',cachedCustomers);
        }

        return response;
    });
}

export default {
    findAll,
    del,
    add,
    findById,
    edit
}
