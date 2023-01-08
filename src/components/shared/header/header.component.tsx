import React from "react";
import {Link} from "react-router-dom";
import '../../../App.css';

const Header = (props: any) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">
                <h1 className="blackText"><Link to="/"> Mental Math Trainer </Link></h1>
            </div>
        </nav>
    )
}

export default Header;