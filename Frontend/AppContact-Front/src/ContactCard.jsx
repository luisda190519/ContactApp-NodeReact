import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ContactCard = function (props) {
    console.log(props);
    let contactos = props.contacts.map((contact, index) => {
        return (
            <div className="card" style={{width:"18rem"}} key={index}>
                <img src={contact.profilePic} />
                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                </div>
            </div>
        );
    });
    return contactos;
};

export default ContactCard;
