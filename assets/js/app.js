//Import Bootstrap and plugins
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../sass/app.scss');

require('../../node_modules/startbootstrap-sb-admin/js/sb-admin.min');

import React from 'react';
import ReactDom from "react-dom";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import Home from "./Views/Home";
import Footer from "./Components/Footer";

import {HashRouter, Switch, Route} from "react-router-dom";
import Customers from "./Views/Customers";
import Invoices from "./Views/Invoices";

const App = () => {
    return (<>
        <HashRouter>
            <NavBar/>
            <div id="wrapper">
                <SideBar/>
                <main>
                    <Switch>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/invoices" component={Invoices}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        </HashRouter>
    </>);
};
const root = document.querySelector('#app');
ReactDom.render(<App />, root);
