//Import Bootstrap and plugins
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../sass/app.scss');
require('../../node_modules/startbootstrap-sb-admin/js/sb-admin.min')

import React from 'react';
import ReactDom from "react-dom";
import SideBar from "./Components/SideBar";
import Nav from "./Components/Nav";
import Content from "./Views/Content";
import Footer from "./Components/footer";



const App = () => {
    return (<>
        {/*<div className="container pt-5">
            <SideBar/>
            <div className="container">
                <NavBar />
                <Home/>
            </div>
        </div>*/}
        <Nav/>
        <div id="wrapper">
            <SideBar/>
            <Content/>
            <Footer/>
        </div>
        {/*Scroll to Top Button*/}
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

    </>);
};
const root = document.querySelector('#app');
ReactDom.render(<App />, root);
