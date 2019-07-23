import React from "react";
const Content = (props) =>{
    return(
        <div id="content-wrapper">

            <div className="container-fluid">

                {/*Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Overview</li>
                </ol>
                <div className="row m-2">
                    <div className="jumbotron">
                        <h1 className="display-3">Hello, world!</h1>
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                            attention to featured content or information.</p>
                        <hr className="my-4" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger
                            container.</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Content;
