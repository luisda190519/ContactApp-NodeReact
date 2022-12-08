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

    const showContacts = async function () {
        let contactos = null;
        await axios
            .get("http://localhost:5173/home/contactsApi/" + sessionID)
            .then((response) => (contactos = response.data))
            .catch((err) => {
                console.error(err);
                return false;
            });

        setContacts(contactos);
        return true;
    };

    sessionActive();

    if (sessionID) {
        console.log(showContacts())
        if (showContacts()) {
            return <ContactCard contacts={contacts} />;
        }
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
