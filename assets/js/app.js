//Import Bootstrap and plugins
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../sass/app.scss');

require('../../node_modules/startbootstrap-sb-admin/js/sb-admin.min');

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
                    <main>
                        <Switch>
                            <ProtectedRoute path="/customers" component={Customers}/>
                            <ProtectedRoute path="/invoices" component={Invoices}/>
                            <ProtectedRoute path="/home" component={Home}/>
                        </Switch>
                    </main>
                    <Footer/>
                </div>
                <Route exact path="/" component={Login} />
            </HashRouter>
        </AuthContext.Provider>
    </>);
};
const root = document.querySelector('#app');
ReactDom.render(<App />, root);
