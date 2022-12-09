import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Form from "./Form";
import MessageCard from "./MessageCard";

const Contact = function (props) {
    const [sessionID, setSessionID] = useState(false);
    let location = useLocation();
    let { userID, contactID } = useParams();

    const labels = {
        first: "",
        last: "",
        email: "",
        profilePic: "",
        number: "",
    };

    const editContact = async function () {
        let datos = null;
        await axios
            .get("http://localhost:5173/contact/" + contactID)
            .then((response) => (datos = response.data))
            .catch((err) => {
                console.error(err);
            });
        
        labels.first = datos.name.first;
        labels.last = datos.name.last;
        labels.email = datos.email;
        labels.profilePic = datos.profilePic;
        labels.number = datos.number;
        return labels
    };

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
    if (sessionID) {
        return (
            <Form
                contact={props.contact}
                name={props.name}
                action={location.pathname}
            />
        );
    } else {
        return (
            <MessageCard
                message="You must first log in to your account to add contacts."
                link="/login"
            />
        );
    }
};

export default Contact;
