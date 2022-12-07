import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Form = function (props) {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const data = {};

    const handleChange = function (e) {
        data[e.target.name] = e.target.value;
    };

    const items = props[props.name].map((element, i) => {
        return (
            <div className="mx-3" key={i}>
                <label className="form-label text-start">
                    {element.label}
                    <input
                        type={element.type}
                        className="form-control px-5 mx-auto text-left"
                        style={{ textAlign: "left" }}
                        name={element.name.toLowerCase()}
                        id={element.name.toLowerCase()}
                        onChange={handleChange}
                    />
                </label>
            </div>
        );
    });

    const handleSubmit = function (e, action) {
        e.preventDefault();

        axios
            .post("http://localhost:5173/" + action, data)
            .then((response) =>
                response.data === "Login succesfully"
                    ? navigate("/")
                    : setMessage("Email or password incorrect")
            )
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form
            className="container"
            onSubmit={(e) => {
                handleSubmit(e, props.name);
            }}
        >
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row w-50">
                    <div className="col px-5 py-5 ">
                        <div className="card shadow">
                            <div className="card-body mb-3">
                                <div className="text-center">{items}</div>
                                <div className="text-center mt-2 text-danger">
                                    {message}
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <button
                                    className="btn btn-success w-50 mb-3"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;
