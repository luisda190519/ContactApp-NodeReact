import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "./Form";
import MessageCard from "./MessageCard"

const Contact = function (props) {
    const [sessionID, setSessionID] = useState(false);
    let location = useLocation();

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

    if (sessionID) {
        return <Form contact={props.contact} name={props.name} />
    }else{
        return <MessageCard message="You must first log in to your account to add contacts." link="/login" />
    }
};

export default Contact;