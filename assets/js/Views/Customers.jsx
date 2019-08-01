import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import CustomersService from '../Services/CustomersService';

const Customers = (props) =>{
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [search, setSearch] = useState("");

    const fetchCustomers = async ()=>{
        try {
            const data = await CustomersService.findAll();
            setCustomers(data);
        }catch(error){
            console.log(error.response)
        }
    };
    useEffect(()=>{
        fetchCustomers();
    }, []);

    const HandleDelete = async id => {
        //Copie du tableau
        const originalData = [...customers];
        //1. Apprcoche Optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersService.del(id);
        }catch(error){
            setCustomers(originalData);
            alert('Erreur de suppression');
        }
    };

    const HandleChangePage = page =>{
        setCurrentPage(page);
    };

    const HandleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredCustomers = customers.filter(
        ({ firstName, lastName, company, email }) =>
            firstName.toLowerCase().includes(search) ||
            lastName.toLowerCase().includes(search) ||
            (company && company.toLowerCase().includes(search)) ||
            email.toLowerCase().includes(search)
    );

    const paginatedCustomer = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return(
        <div id="content-wrapper">
            <div className="container-fluid">
                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accuiel</a>
                    </li>
                    <li className="breadcrumb-item active">Clients</li>
                </ol>
                <div className="row m-2">
                    <h1 className="mr-auto">Liste des clients</h1>
                    <div className="form-inline form-group my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            onChange={HandleSearch}
                            value={search}
                            placeholder="Rechercher ..."
                        />
                    </div>
                    <table className="table table-hover bg-dark-gray">
                        <thead>
                        <tr>
                            <th scope="col">Client</th>
                            <th scope="col">Email</th>
                            <th scope="col">Compagny</th>
                            <th scope="col">Nb Invoice</th>
                            <th scope="col">Montant Total</th>
                            <th scope="col">Impayés</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.length === 0 && (
                            <tr><td>Chargement ...</td></tr>
                        )}
                        {paginatedCustomer.map(customer =>(
                            <tr className="table-dafault" key={customer.id}>
                                <th scope="row">{customer.firstName+" "+customer.lastName.toUpperCase()}</th>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td className="text-center">
                                <span className="badge badge-primary">
                                    {customer.invoices.length}
                                </span>
                                </td>
                                <td className="text-right">
                                <span className="small">
                                    {customer.totalAmount.toLocaleString()} €
                                </span>
                                </td>
                                <td className="text-right">
                                <span className="badge badge-danger">
                                    {customer.unpaidAmount.toLocaleString()} €
                                </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => HandleDelete(customer.id)}
                                        disabled={customer.invoices.length > 0}
                                        className="btn btn-sm btn-outline-danger">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                    {/*Pagination*/}
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredCustomers.length}
                        onChangePage={HandleChangePage}
                    />
                </div>
            </div>
        </div>

    );
}
export default Customers;
