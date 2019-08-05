//Import Bootstrap and plugins
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

//Sb-admin-2
import 'startbootstrap-sb-admin/js/sb-admin.min';

//Select2
import 'select2/dist/js/select2.full.min';

//Password-strength-meter
/*import 'password-strength-meter/dist/password.min';*/

require('password-strength-meter/dist/password.min');

import OptPassword from './Components/Forms/optionsPassword';

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../sass/app.scss');

import React, {useState} from 'react';
import ReactDom from "react-dom";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import Home from "./Views/Home";
import Footer from "./Components/Footer";

import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import Customers from "./Views/Customers";
import Invoices from "./Views/Invoices";
import Login from "./Views/Login";
import LoginService from "./Services/LoginService";
import AuthContext from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Customer from "./Views/Customer";
import Invoice from "./Views/invoice";
import Register from "./Views/Register";

LoginService.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] =  useState(LoginService.isAuthenticate());

    const NavBarWithRouter = withRouter(NavBar);

    const contextValue = {
        isAuthenticated, setIsAuthenticated
    };
    return (<>
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavBarWithRouter />
                <div id="wrapper">
                    <SideBar/>
                    <main className="w-100 p-3 mb-3">
                        <Switch>
                            <ProtectedRoute path="/customers/:id" component={Customer}/>
                            <ProtectedRoute path="/invoices/:id" component={Invoice}/>
                            <ProtectedRoute path="/customers" component={Customers}/>
                            <ProtectedRoute path="/invoices" component={Invoices}/>
                            <ProtectedRoute path="/home" component={Home}/>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/" component={Login} />
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </HashRouter>
        </AuthContext.Provider>
    </>);
};
$(document).ready(function() {
    $('.select2').select2();
});

const root = document.querySelector('#app');
ReactDom.render(<App />, root);
