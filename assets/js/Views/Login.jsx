import React, {useContext, useState} from 'react';
import LoginService from "../Services/LoginService";
import AuthContext from "../Contexts/AuthContext";

const Login = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    isAuthenticated?history.replace('/home'):'';

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
        try {
            await LoginService.authentication(credentials);
            setError("");
            setIsAuthenticated(true);
        }catch (error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas.");
        }
    };

    return(<>
        <div className="container">
            <div className="card card-login mx-auto mt-5">
                <div className="card-header bg-primary text-white">Connexion</div>
                <div className="card-body">
                    <form onSubmit={HandleSubmit}>
                        {/*<fieldset>*/}
                            <div className="form-group">
                                <input
                                    className={"form-control col-12 "+(error && "is-invalid")}
                                    placeholder="E-mail"
                                    name="username"
                                    type="text"
                                    value={credentials.username}
                                    onChange={HandleChange}
                                />
                                {error && <p className="invalid-feedback">{error}</p> }
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control col-12"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={credentials.password}
                                    onChange={HandleChange}
                                />
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" value="Remember Me"/> Mémoriser
                                </label>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary float-right" type="submit">
                                    Se connecter
                                </button>
                            </div>

                        {/*</fieldset>*/}
                    </form>
                    {/*<div className="text-center text-primary">
                        <a className="d-block small mt-3" href="">Register an Account</a>
                        <a className="d-block small" href="">Forgot Password?</a>
                    </div>*/}
                </div>
            </div>
        </div>
        </>);
};

export default Login;
