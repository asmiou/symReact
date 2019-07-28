import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../Components/Pagination";

const CustomersPaginationApi = (props) =>{
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then( response =>{
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
            })
            .catch(error => console.log(error.response));
    }, [currentPage]);

    const HandleDelete = id => {
        const originalData = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete('http://localhost:8000/api/customers/'+id)
            .then(console.log("Notification: Suppression effectés avec succès"))
            .catch(error =>{
                    console.log(error.response);
                    //2. Approche passimiste
                    setCustomers(originalData);
                    alert('Erreur de suppression');
            });
    };

    const HandleChangePage = page =>{
        setCustomers([]);
        setCurrentPage(page);
    };

    return(<div id="content-wrapper">
            <div className="container-fluid">
                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accuiel</a>
                    </li>
                    <li className="breadcrumb-item active">Customers</li>
                </ol>
                <div className="row m-2">
                    <h1>Liste des utilisateurs (pagination)</h1>
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
                        {customers.map(customer =>(
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
                        length={totalItems}
                        onChangePage={HandleChangePage}
                    />
                </div>
            </div>
            {/*Scroll to Top Button*/}
            {/*<a className="scroll-to-top rounded" href="">
                <i className="fas fa-angle-up"></i>
            </a>*/}
        </div>
    );
}
export default CustomersPaginationApi;
