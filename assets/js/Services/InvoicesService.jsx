import axios from 'axios';
import CacheService from "./CacheService";
import {INVOICE_URL} from '../config';
let URL = INVOICE_URL;

/**
 * Fetch all invoices from database
 * @returns {Promise<AxiosResponse<T>>}
 */
async  function findAll(){
    const cachedInvoices = await CacheService.get('invoices');
    if(cachedInvoices) return cachedInvoices;

    return axios.get(URL)
        .then( response => {
            const invoices = response.data['hydra:member'];
            CacheService.set('invoices', invoices);
            return invoices;
        });
}

/**
 * Remove customer from database
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
function del(id){
    return axios.delete(URL+`/${id}`).then(async response =>{
        const cachedInvoices = await CacheService.get('invoices');
        if(cachedInvoices){
            cachedInvoices.set("invoices",cachedInvoices.filter(i => i.id !== id));
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
    const cachedInvoice = await CacheService.get('invoice.'+id);
    if(cachedInvoice) return cachedInvoice;

    return axios.get(URL+`/${id}`)
        .then(response => {
            const invoice = response.data;
            CacheService.set('invoice.'+id,invoice);
            return invoice;
        });
}
/**
 * Add customer in database
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function add(data) {
    const invoice = {...data, customer:`/api/customers/${data.customer}`}
    return axios.post(URL,invoice).then(async response =>{
        const cachedInvoices = await CacheService.get('invoices');
        if(cachedInvoices){
            cachedInvoices.set("invoices",[...cachedInvoices, response.data]);
        }

        return response;
    });
}

/**
 * Update customer information
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
function edit(id, data){
    const invoice = {...data, customer:`/api/customers/${data.customer}`};
    return axios.put(URL+`/${id}`,invoice).then(async response => {
        const cachedInvoices = await CacheService.get('invoices');
        const cachedInvoice = await CacheService.get('invoice.'+id);

        if(cachedInvoice){
            CacheService.set('invoice.'+id, response.data);
        }

        if (cachedInvoices) {
            const index = cachedInvoices.findIndex(i => i.id === id);
            cachedInvoices[index] = response.data;
            cachedInvoices.set("invoices", cachedInvoices);
        }

        return response;
    });
}

export default {
    findAll,
    del,
    findById,
    add,
    edit
}
