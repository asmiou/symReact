import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import InvoicesService from '../Services/InvoicesService';
import moment from 'moment';
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";

const Invoices = (props) =>{
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const StatusClass = {
        PAID: 'success',
        SENT: 'primary',
        CANCELLED: 'danger'
    };

    const StatusLabel= {
        PAID: 'Payée',
        SENT: 'Envoyée',
        CANCELED: 'Annulée'
    };

    const fetchInvoices = async ()=>{
        setLoading(true);
        try {
            const data = await InvoicesService.findAll();
            setInvoices(data);
            setLoading(false);
        }catch(error){
            setLoading(false);
            console.log(error.response)
        }
    };
    useEffect(()=>{
        fetchInvoices();
    }, []);

    const handleDelete = async id => {
        //Copie du tableau
        const originalData = [...invoices];
        //1. Apprcoche Optimiste
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesService.del(id);
        }catch(error){
            setInvoices(originalData);
            alert('Erreur de suppression');
        }
    };

    const handleChangePage = page =>{
        setCurrentPage(page);
    };

    const handleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value.toLowerCase());
        setCurrentPage(1);
        //console.log('Recherche: '+value)
    };

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(
        ({ customer, amount, status }) =>
            customer.firstName.toLowerCase().includes(search)||
            customer.lastName.toLowerCase().includes(search) ||
            amount.toString().toLowerCase().startsWith(search)||
            (StatusLabel[status]&&StatusLabel[status].toLowerCase().includes(search))
    );

    const paginatedInvoice = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);
    const dataOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return(
        <div id="content-wrapper">
            <div className="container-fluid">
                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accuiel</a>
                    </li>
                    <li className="breadcrumb-item active">Factures</li>
                </ol>
                <div className="pb-2">
                    <div className="d-flex justify-content-between">
                        <h3 className="mr-auto">Liste des factures</h3>
                        <Link to="/invoices/new" className="btn btn-lg btn-outline-primary">
                            <i className="fas fa-user-plus"> </i> Nouvelle facture
                        </Link>
                    </div>
                    <div className="p-2 ">
                        <input
                            className="form-control col-4 mr-auto"
                            type="text"
                            onChange={handleSearch}
                            value={search}
                            placeholder="Rechercher ..."
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <table className="table table-hover bg-dark-gray">
                        <thead>
                        <tr>
                            <th scope="col">Ref</th>
                            <th scope="col">Client</th>
                            <th scope="col">Status</th>
                            <th scope="col">Emis</th>
                            <th scope="col">Montant Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading && (
                            <tr><td><Loader type="ThreeDots" color="#1E4370" height={45} width={45}/></td></tr>
                            ) || ((invoices.length === 0) && <tr><td><h5>Aucune facture trouvée</h5></td></tr>)
                        }
                        {paginatedInvoice.map(invoice =>(
                            <tr className="table-dafault" key={invoice.id}>
                                <th className="text-primary">{invoice.reference}</th>
                                <th scope="row">{invoice.customer.firstName+" "+invoice.customer.lastName.toUpperCase()}</th>
                                <td className={'text-'+StatusClass[invoice.status]}>{StatusLabel[invoice.status]}</td>
                                <td>{moment(invoice.sentAt).format('DD/MM/YYYY')}</td>
                                <td className="text-center">
                                <span className="badge badge-primary">
                                    {invoice.amount.toLocaleString()} €
                                </span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <Link to={"/invoices/"+invoice.id} className="btn btn-sm btn-outline-primary">
                                            <i className="far fa-edit"> </i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(invoice.id)}
                                            className="btn btn-sm btn-outline-danger">
                                            <i className="fas fa-trash"> </i>
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                    {/*Pagination*/}
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredInvoices.length}
                        onChangePage={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}
export default Invoices;
