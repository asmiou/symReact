import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const SideBar = ()=>{
    const {isAuthenticated} = useContext(AuthContext);
    return(<>
        {isAuthenticated &&
        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span> Home</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/invoices">
                    <i className="fas fa-file"></i>
                    <span> Factures</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/customers">
                    <i className="fas fa-user-alt"></i>
                    <span> Clients</span>
                </NavLink>
            </li>
        </ul>}
    </>);
}

export default SideBar;
