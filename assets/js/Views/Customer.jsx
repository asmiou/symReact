import React, {useEffect, useState} from 'react';
import Field from "../Components/Forms/Field";
import {Link, NavLink} from "react-router-dom";
import CustomersService from '../Services/CustomersService';
import Loader from "react-loader-spinner";
import {toast} from "react-toastify";
import FormLoader from "../Components/Loaders/FormLoader";

const Customer = ({match, history}) =>{
    const {id = "new"} = match.params;

    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:"",
    });

    const [errors, setErrors] = useState({
        lastName:"",
        firstName:"",
        email:""
    });

    const [isEditing, setIsEditing] = useState(false);

    const fetchCustomer = async id => {
        setLoading(true);
        try {
            const {firstName, lastName, email, company} = await CustomersService.findById(id);
            setCustomer({firstName, lastName, email, company});
            setLoading(false);
        }catch (error) {
            console.log(error.response);
            history.replace('/customers');
        }
    }

    useEffect(() => {
        if(id !== "new"){
            setIsEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    const handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        setCustomer({...customer, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);

        try{
            if(isEditing){
                await CustomersService.edit(id,customer);
                setLoading(false);
                setErrors({});
                toast.success('Les modifications ont bien été enregistrées ');
            }else{
                await  CustomersService.add(customer);
                setLoading(false);
                setErrors({});
                toast.success('Le client est ajouté avec succes');
                history.replace('/customers')
            }
        }catch({response}) {
            setLoading(false);
            const {violations} = response.data;
            if(violations){
                let apiErrors = {};
                response.data.violations.map(({propertyPath, message}) =>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            toast.error('Une erreur est rencontrée, le serveur ne reponds pas');
        }
    };

    return (<>
        <div id="content-wrapper">
            <div className="container-fluid">
                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to={"/home"}>Accuiel</NavLink>
                    </li>
                    <li className="breadcrumb-item">
                        <NavLink to={"/customers"}>Clients</NavLink>
                    </li>
                    {(!isEditing &&
                        <li className="breadcrumb-item active">Nouveau</li> ||
                        <li className="breadcrumb-item active">Modification</li>
                    )}
                </ol>
                <div className="row m-2 col-12">
                    <div className="card w-100">
                        <div className="card-header bg-primary">
                            <div className={"card-text text-white"}>
                                {(!isEditing && <h3>Nouveau client</h3> || <h3>Modification d'un client</h3>)}
                            </div>
                        </div>
                        <div className="card-body">
{/*                            {(isEditing && loading &&
                                <Loader type="ThreeDots" color="#1E4370" height={45} width={45}/>
                                || '')}*/}
                            {loading && <FormLoader/> }
                            {!loading &&
                            <form onSubmit={handleSubmit} method={"post"}>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <Field
                                            name={"firstName"}
                                            value={customer.firstName}
                                            onChange={handleChange}
                                            placeholder={"Nom"}
                                            label={"Nom"}
                                            type={"text"}
                                            error={errors.firstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Field
                                            name={"lastName"}
                                            value={customer.lastName}
                                            onChange={handleChange}
                                            placeholder={"Prénom"}
                                            label={"Prénom"}
                                            type={"text"}
                                            error={errors.lastName}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <Field
                                            name={"email"}
                                            value={customer.email}
                                            onChange={handleChange}
                                            placeholder={"Adresse email"}
                                            type={"email"}
                                            error={errors.email}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Field
                                            name={"company"}
                                            value={customer.company}
                                            onChange={handleChange}
                                            placeholder={"Compagnie"}
                                            type={"text"}
                                            error={""}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Link to="/customers" className="btn btn-lg" tabIndex="-1">
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
    </>);
};

export default Customer;
