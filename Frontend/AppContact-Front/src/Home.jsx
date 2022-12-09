import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "./Form";
import MessageCard from "./MessageCard";
import ContactCard from "./ContactCard";

const Home = function (props) {
    const [sessionID, setSessionID] = useState(false);
    const [contacts, setContacts] = useState(null);
    let location = useLocation();
    let navigate = useNavigate();

    const sessionActive = async function () {
        let datos = null;
        await axios
            .get("http://localhost:5173/session")
            .then((response) => setSessionID(response.data))
            .catch((err) => {
                console.error(err);
            });
    };

    const ShowContacts = async function () {
        let contactos = null;
        await axios
            .get("http://localhost:5173/home/contactsApi/" + sessionID)
            .then((response) => {
                contactos = response.data;
                setContacts(contactos)
                return contactos;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    };

    sessionActive();

    if (sessionID) {
        while(!ShowContacts()){
            //console.log("hola");
        }
        return <ContactCard contacts={contacts} />;
    } else {
        return (
            <MessageCard
                message="You must first log in to your account to see your contacts."
                link="/login"
            />
        );
    }
};

export default Home;
