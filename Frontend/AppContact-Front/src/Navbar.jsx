import React from "react";
import axios from "axios";
import { useState } from "react";

const Navbar = function () {
    const [sessionID, setSessionID] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand mx-4" href="#">
                Contact App
            </a>
            <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/login">
                            Login
                        </a>
                    </li>
                    ), (
                    <li className="nav-item active">
                        <a className="nav-link" href="/register">
                            Register
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
