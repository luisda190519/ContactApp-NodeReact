import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";
import Home from "./Home";
import Navbar from "./navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const inputs = [
    {
        name: "First",
        type: "text",
        label: "First Name",
    },

    {
        name: "Last",
        type: "text",
        label: "Last Name",
    },

    {
        name: "Age",
        type: "number",
        label: "Age",
    },

    {
        name: "Gender",
        type: "text",
        label: "Gender",
    },

    {
        name: "Email",
        type: "text",
        label: "Email",
    },

    {
        name: "Password",
        type: "password",
        label: "Password",
    },
    {
        name: "Image",
        type: "text",
        label: "Image",
    },
];


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/:userID" element={<Home />} />
                <Route
                    path="/login"
                    element={<Login login={inputs.slice(4, 6)} name="login" />}
                />
                <Route
                    path="/register"
                    element={
                        <Register register={inputs.slice(0, 6)} name="register" />
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <Contact contact={inputs.slice(0, 2).concat(inputs.slice(4, 5)).concat(inputs.slice(6))} name="contact" />
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
