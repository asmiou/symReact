import React, {useEffect, useState} from "react";
import Pagination from "../Components/Pagination";
import InvoicesService from '../Services/InvoicesService';
import moment from 'moment';

const Invoices = (props) =>{
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const StatusClass = {
        PAID: 'success',
        SENT: 'primary',
        CANCELED: 'danger'
    };

    const StatusLabel= {
        PAID: 'Payée',
        SENT: 'Envoyée',
        CANCELED: 'Annulée'
    };

    const fetchInvoices = async ()=>{
        try {
            const data = await InvoicesService.findAll();
            setInvoices(data);
        }catch(error){
            console.log(error.response)
        }
    };
    useEffect(()=>{
        fetchInvoices();
    }, []);

    const HandleDelete = async id => {
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

    const HandleChangePage = page =>{
        setCurrentPage(page);
    };

    const HandleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value.toLowerCase());
        setCurrentPage(1);
        //console.log('Recherche: '+value)
    };

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(
        invoice =>{
            invoice.customer.firstName.toLowerCase().includes(search)||
            invoice.customer.lastName.toLowerCase().includes(search) ||
            invoice.amount.toString().toLowerCase().startsWith(search)||
            StatusLabel[invoice.status].toLowerCase().includes(search);
    });
    
    //console.log('Factures: \n'+invoices)
    //console.log('Taille filtés L54: \n'+filteredInvoices.length);

    const paginatedInvoice = Pagination.getData(filteredInvoices.length>0?filteredInvoices:invoices, currentPage, itemsPerPage);
    //const paginatedInvoice = Pagination.getData(invoices, currentPage, itemsPerPage);
    //const paginatedInvoice = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);
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
                <div className="row m-2">
                    <h1 className="mr-auto">Liste des factures</h1>
                    <div className="form-inline form-group my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            onChange={HandleSearch}
                            value={search}
                            type="text"
                            placeholder="Rechercher ..."
                        />
                    </div>
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
                        {invoices.length === 0 && (
                            <tr><td>Chargement ...</td></tr>
                        )}
                        {paginatedInvoice.map(invoice =>(
                            <tr className="table-dafault" key={invoice.id}>
                                <td className="badge badge-primary">{invoice.reference}</td>
                                <th scope="row">{invoice.customer.firstName+" "+invoice.customer.lastName.toUpperCase()}</th>
                                <td className={'text-'+StatusClass[invoice.status]}>{StatusLabel[invoice.status]}</td>
                                <td>{moment(invoice.sentAt).format('DD/MM/YYYY')}</td>
                                <td className="text-center">
                                <span className="badge badge-primary">
                                    {invoice.amount.toLocaleString()} €
                                </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => HandleDelete(invoice.id)}
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
                        /*length={Invoices.length}*/
                        length={filteredInvoices.length}
                        //length={filteredInvoices.length>0?filteredInvoices.length:invoices.length}
                        onChangePage={HandleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}
export default Invoices;
