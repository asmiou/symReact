import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import CustomersService from '../Services/CustomersService';
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";

const Customers = (props) =>{
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCustomers = async ()=>{
        setLoading(true);
        try {
            const data = await CustomersService.findAll();
            setCustomers(data);
            setLoading(false);
        }catch(error){
            console.log(error.response)
            setLoading(false);
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
                <div className="pb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="mr-auto">Liste des clients</h3>
                        <Link to="/customers/new" className="btn btn-lg btn-outline-primary">
                            <i className="fas fa-user-plus"> </i> Nouveau client
                        </Link>
                    </div>
                    <div className="p-2 ">
                        <input
                            className="form-control col-4 mr-auto"
                            type="text"
                            onChange={HandleSearch}
                            value={search}
                            placeholder="Rechercher ..."
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div className="table-responsive">
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
                            {loading && (
                                <tr><td><Loader type="ThreeDots" color="#1E4370" height={45} width={45}/></td></tr>
                            ) || ((customers.length === 0) && <tr><td><h5>Aucune client trouvé</h5></td></tr>)
                            }
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
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/customers/"+customer.id} className="btn btn-sm btn-outline-primary">
                                                <i className="far fa-edit"> </i>
                                            </Link>
                                            <button
                                                onClick={() => HandleDelete(customer.id)}
                                                disabled={customer.invoices.length > 0}
                                                className="btn btn-sm btn-outline-danger">
                                                <i className="fas fa-trash"> </i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>)
                            )}
                            </tbody>
                        </table>
                    </div>
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
