import React, {useContext} from "react";
import AuthContext from "../Contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({path, component})=>{
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated?<Route path={path} component={component}/>:<Redirect to="/"/>
};

export default ProtectedRoute;
