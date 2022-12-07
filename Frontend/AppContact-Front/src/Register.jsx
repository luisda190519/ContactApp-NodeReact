import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "./Form";

const Register = function (props) {
    const [sessionID, setSessionID] = useState(false);
    let location = useLocation();
    let navigate = useNavigate();

    const sessionActive = async function () {
        let datos = null;
        await axios
            .get("http://localhost:5173" + location.pathname)
            .then((response) => (datos = response.data))
            .catch((err) => {
                console.error(err);
            });
        setSessionID(datos);
    };

    sessionActive();
    if (!sessionID) {
        return <Form register={props.register} name={props.name} />
    }
    
    return navigate("/")
};

export default Register;
