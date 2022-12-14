import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "./Form";

const Login = function (props) {
    const [sessionID, setSessionID] = useState(false);
    let location = useLocation();
    let navigate = useNavigate();

    const sessionActive = async function () {
        let datos = null;
        await axios
            .get("http://localhost:5173/session")
            .then((response) => (datos = response.data))
            .catch((err) => {
                console.error(err);
            });
        setSessionID(datos);
    };

    sessionActive();
    if (!sessionID) {
        return <Form login={props.login} name={props.name} action={location.pathname} />
    }
    
    return navigate("/")
};

export default Login;
