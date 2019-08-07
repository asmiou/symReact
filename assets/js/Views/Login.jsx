import React, {useContext, useState} from 'react';
import LoginService from "../Services/LoginService";
import AuthContext from "../Contexts/AuthContext";
import Loader from 'react-loader-spinner'
import Field from "../Components/Forms/Field";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    isAuthenticated?history.replace('/home'):'';

    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "hasmiou@mondemarcheur.com",
        password: "password"
    });

    const HandleChange = (event) =>{
        const input = event.currentTarget.name;
        const value = event.currentTarget.value;

        setCredentials({...credentials, [input]:value});
    };

    const [error, setError] = useState("");

    const HandleSubmit = async (event)=>{
        event.preventDefault();
        setLoading(true);
        try {
            await LoginService.authentication(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.info('Bienvenu à vous, heureux de vous retrouver!');
        }catch (error) {
            setLoading(false);
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas.");
            //toast.error('Le serveur ne répond pas.');
        }
    };

    return(<>
        <div className="container">
            <div className="card card-login mx-auto mt-5">
                <div className="card-header bg-primary">
                    <h3 className="text-white">Connexion</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={HandleSubmit}>
                        <Field
                            name={"username"}
                            value={credentials.username}
                            onChange={HandleChange}
                            placeholder={"Adresse Email de connexion"}
                            type={"text"}
                            error={error}
                        />
                        <Field
                            name={"password"}
                            value={credentials.password}
                            onChange={HandleChange}
                            placeholder={"Mot de passse de connexion"}
                            type={"password"}
                        />

                        <div className="checkbox">
                            <label>
                                <input name="remember" type="checkbox" value="Remember Me"/> Mémoriser
                            </label>
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <Link to={"/register"} className={"btn"}>
                                S'inscrire
                            </Link>
                            <div className={"d-flex justify-content-end"}>
                                <button className="btn btn-primary float-left mr-2" type="submit">
                                    Se connecter
                                </button>
                                {loading && <Loader type="Rings" color="#1E4370" height={35} width={35}/>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>);
};

export default Login;
