import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ContactCard = function (props) {
    let contactos = null;
    let location = useLocation();
    let navigate = useNavigate();

    const handleGetClick = function (e, action, contactID) {
        navigate(location.pathname.replace("home", "contact") + action + contactID);
    };

    const handlePostClick = async function (e, action, contactID) {
        e.preventDefault();
        await axios
            .post("http://localhost:5173" + location.pathname.replace("home", "contact") + action + contactID)
            .catch((err) => {
                console.error(err);
            });
    };

    try {
        contactos = props.contacts.map((contact, index) => {
            return (
                <div
                    className="card mx-4  my-4 col"
                    style={{ width: "18rem" }}
                    key={index}
                >
                    <img
                        src={contact.profilePic}
                        className="card-img-top rounded"
                    />
                    <div className="card-body">
                        <p className="card-text">
                            Nombre: {contact.name.first} {contact.name.last}
                        </p>
                        <p className="card-text">Number: {contact.number}</p>
                        <p className="card-text">Email: {contact.email}</p>
                        <div className="text-center">
                            <button className="btn btn-warning mx-3" onClick={(event) => handleGetClick(event, "/edit", "/" + contact._id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger mx-3" onClick={(event) => handlePostClick(event, "/delete", "/" + contact._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    } catch (error) {}

    return (
        <div className="container my-4">
            <div className="row row-cols-auto">
                {contactos}
                <div
                    className="card mx-4  my-4 col"
                    style={{ width: "18rem" }}
                    onClick={(event) => handleGetClick(event, "", "")}
                >
                    <img
                        src="https://moticeurope.com/media/catalog/product/cache/ef0b392b87b09aac7ddf3931bf54d740/1/2/12180145_r_reticle_with_crosshair_diameter_19mm_00.jpg"
                        className="card-img-bottom"
                    />
                    <div className="card-img-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
