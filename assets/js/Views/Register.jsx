import React, {useContext, useState} from 'react';
import Field from "../Components/Forms/Field";
import {Link} from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import LoginService from "../Services/LoginService";
import Loader from "react-loader-spinner";
import {toast} from "react-toastify";

const Register = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    isAuthenticated?history.replace('/home'):'';

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: ""
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        const apiErrors = {};

        if (user.password !== user.confirm) {
            apiErrors.confirm = "Les mots de passe ne sont pas conforment";
            setErrors(apiErrors);
            //toast.error("Des erreurs dans votre formulaire !");
            setLoading(false);
            return;
        }

        try {
            await LoginService.register(user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !");
            history.replace("/");
        } catch ({response}){
            setLoading(false);
            const {violations} = response.data;
            if(violations){
                let apiErrors = {};
                violations.map(({propertyPath, message}) =>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            //toast.warn("Une erreur s'est produite le serveur ne reponds pas");
        }
    };


    return(<>
        <div className="container">
            <div className="card card-register mx-auto mt-5">
                <div className="card-header bg-primary">
                    <h3 className="text-white">Connexion</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <Field
                                        name={"firstName"}
                                        value={user.firstName}
                                        onChange={handleChange}
                                        label={"Nom"}
                                        placeholder={"Nom de famille"}
                                        error={errors.firstName}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name={"lastName"}
                                        value={user.lastName}
                                        onChange={handleChange}
                                        label={"Prénoms"}
                                        placeholder={"Prénoms"}
                                        error={errors.lastName}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <Field
                                name={"email"}
                                type={'email'}
                                value={user.email}
                                onChange={handleChange}
                                label={"Email"}
                                placeholder={"Adresse email de connexion"}
                                error={errors.email}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <Field
                                        name={"password"}
                                        type={'password'}
                                        value={user.password}
                                        onChange={handleChange}
                                        label={"Mot de passe"}
                                        placeholder={"Mot de passe"}
                                        error={errors.password}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        name={"confirm"}
                                        type={'password'}
                                        value={user.confirm}
                                        onChange={handleChange}
                                        label={"Confirmation"}
                                        placeholder={"Vérification du mot de passe"}
                                        error={errors.confirm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="btn-group" role="group">
                                <Link tabIndex="-1" className="btn" to="/">Se connecter</Link>
                                <Link tabIndex="-1" className="btn" to="">Mot de passe oublié?</Link>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary btn-lg">S'incrire</button>
                                {loading && <Loader type="Rings" color="#1E4370" height={35} width={35}/>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
};

export default Register;
