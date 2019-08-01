import React from "react";
import LoginService from "../Services/LoginService";
const Footer = (props)=>{
    return(<>
        { LoginService.isAuthenticate() &&
        <footer className="sticky-footer bg-secondary">
            <div className="container my-auto col-12">
                <div className="copyright text-center my-auto">
                    <span>Copyright © SymReact 2019</span>
                </div>
            </div>
        </footer>
        }
    </>);
};

export default Footer;
