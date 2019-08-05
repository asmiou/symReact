import React, {useContext} from "react";
import LoginService from "../Services/LoginService";
import {NavLink} from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const NavBar = ({history})=>{
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = ()=>{
        LoginService.logout();
        setIsAuthenticated(false);
        history.push('/');
    };

    return(
        <nav className="navbar navbar-expand navbar-dark bg-primary static-top">
            <div className="text-white">
                <i className="fab fa-symfony fa-2x"></i> <i className="fab fa-react fa-2x"></i>
            </div>
            <NavLink className="navbar-brand mr-1" to="/">SymReact</NavLink>
            {/*<button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" to="#">
                <i className="fas fa-bars"></i>
            </button>*/}
            { isAuthenticated &&
                <>
                    {/*Navbar Search*/}
                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..." aria-label="Search"
                                   aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/*Navbar*/}
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown no-arrow mx-1">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                <span className="badge badge-danger">9+</span>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                <NavLink className="dropdown-item" to="#">Action</NavLink>
                                <NavLink className="dropdown-item" to="#">Another action</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                <span className="badge badge-danger">7</span>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                                <NavLink className="dropdown-item" to="#">Action</NavLink>
                                <NavLink className="dropdown-item" to="#">Another action</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-circle fa-fw"></i>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <NavLink className="dropdown-item" to="#">Settings</NavLink>
                                <NavLink className="dropdown-item" to="#">Activity Log</NavLink>
                                <div className="dropdown-divider"></div>
                                <button className="btn btn-outline-danger dropdownitem m-3" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"> </i> Logout
                                </button>
                            </div>
                        </li>
                    </ul>
                </>
            }
        </nav>
    );
}
export default NavBar;
