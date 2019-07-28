import React from "react";
const SideBar = (props)=>{

    return(
        /*Sidebar*/
        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="#">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span> Home</span>
                </a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-file"></i>
                    <span> Facture</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                    <h6 className="dropdown-header">Login Screens:</h6>
                    <a className="dropdown-item" href="login.html">Login</a>
                    <a className="dropdown-item" href="register.html">Register</a>
                    <a className="dropdown-item" href="forgot-password.html">Forgot Password</a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header">Other Pages:</h6>
                    <a className="dropdown-item" href="404.html">404 Page</a>
                    <a className="dropdown-item" href="blank.html">Blank Page</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-user-alt"></i>
                    <span> Clients</span></a>
            </li>
        </ul>
    );
}

export default SideBar;
