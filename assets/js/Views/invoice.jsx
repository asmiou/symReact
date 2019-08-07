import React, {useEffect, useState} from 'react';
import Field from "../Components/Forms/Field";
import {Link, NavLink} from "react-router-dom";
import InvoicesService from '../Services/InvoicesService';
import Loader from "react-loader-spinner";
import Select from "../Components/Forms/Select";
import CustomersService from "../Services/CustomersService";
import {toast} from "react-toastify";
import FormLoader from "../Components/Loaders/FormLoader";

const Invoice = ({match, history}) =>{
    const {id = "new"} = match.params;

    const StatusLabel= {
        PAID: 'Payée',
        SENT: 'Envoyée',
        CANCELED: 'Annulée'
    };

    const [invoice, setInvoice] = useState({
        amount:"",
        status:"SENT",
        customer:""
    });

    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({
        amount:"",
        status:"",
        customer:"",
        user:""
    });

    const [isEditing, setIsEditing] = useState(false);

    const [customers, setCustomers] = useState([]);

    //TODO: Revoire le chargement des clients pour qu'il puisse assigner le bon client pour la facture lors d'une modification
    const fetchCustomers = async () => {
        try{
            const data = await CustomersService.findAll();
            setCustomers(data);
            if(!invoice.customer) setInvoice({...invoice, customer:data[0].id})
            setLoading(false);
        }catch (error) {
            setLoading(false);
            toast.warn("Une erreur s'est produite lors du chargement des factures");
        }
    };

    const fetchInvoice = async id => {
        try {
            const {amount, status, customer} = await InvoicesService.findById(id);
            setInvoice({amount, status, customer:customer.id});
            setLoading(false);
        }catch (error) {
            setLoading(false);
            toast.warn("Une erreur s'est produite lors du chargement de la facture");
            history.replace('/invoices');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if(id !== "new"){
            setIsEditing(true);
            fetchInvoice(id);
        }
    }, [id]);

    const handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        setInvoice({...invoice, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        //const data = {...invoice, customer:`/api/customers/${invoice.customer}`}
        try{
            if(isEditing){
                await InvoicesService.edit(id,invoice);
                setLoading(false);
                setErrors({});
                toast.success("Les modifications sont enregistrées avec succes");
            }else{
                await  InvoicesService.add(invoice);
                setLoading(false);
                setErrors({});
                toast.warn("L'ajout de la facture s'est éffectué avec succes");
                history.replace('/invoices');
            }
        }catch({response}) {
            setLoading(false);
            const {violations} = response.data;
            if(violations){
                let apiErrors = {};
                violations.map(({propertyPath, message}) =>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            toast.warn("Une erreur s'est produite, veillez réessayer");
        }
    };

    return (
        <>
        <div id="content-wrapper">
            <div className="container-fluid">
                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to={"/home"}>Accuiel</NavLink>
                    </li>
                    <li className="breadcrumb-item">
                        <NavLink to={"/invoices"}>Facture</NavLink>
                    </li>
                    {(!isEditing &&
                        <li className="breadcrumb-item active">Nouvelle</li> ||
                        <li className="breadcrumb-item active">Modification</li>
                    )}
                </ol>
                <div className="row m-2 col-12">
                    <div className="card w-100">
                        <div className="card-header bg-primary">
                            <div className={"card-text text-white"}>
                                {(!isEditing && <h3>Nouvelle Facture</h3> || <h3>Modification d'une facture</h3>)}
                            </div>
                        </div>
                        <div className="card-body">
                            {loading && <FormLoader/> }
                            {!loading &&
                                <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <Field
                                            name={"amount"}
                                            label={"Montant (€)"}
                                            value={invoice.amount}
                                            onChange={handleChange}
                                            placeholder={"Montant de la facture"}
                                            type={"number"}
                                            error={errors.amount}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            value={invoice.status}
                                            label={"Status"}
                                            error={errors.status}
                                            onChange={handleChange}
                                            name={"status"}
                                        >
                                            {Object.keys(StatusLabel).map(s =>
                                                <option key={s} value={s}>{StatusLabel[s]}</option>
                                            )}
                                        </Select>
                                    </div>
                                    <div className="col-md-6">
                                        <Select
                                            value={invoice.customer}
                                            label={"Client"}
                                            error={errors.customer}
                                            onChange={handleChange}
                                            name={"customer"}
                                        >
                                            {customers.map(({id, lastName, firstName}) =>
                                                    <option key={id} value={id}>{lastName+' '+firstName}</option>
                                            )}
                                        </Select>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Link to="/invoices" className="btn btn-lg" tabIndex="-1">
                                        <i className="fas fa-chevron-left"> </i> Retour à la liste
                                    </Link>
                                    <div className="form-group d-flex justify-content-end">
                                        <button className="btn btn-primary btn-lg"><i className="far fa-save"> </i> Enregistrer</button>
                                        {loading && <Loader type="Rings" color="#1E4370" height={35} width={35}/>}
                                    </div>
                                </div>
                            </form>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Invoice;
