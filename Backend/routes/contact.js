const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Contact = require("../models/contact");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(req.session.userID);
});

router.post("/:userID", async (req, res) => {
    const contact = {
        "name.first": req.body.first,
        "name.last": req.body.last,
        email: req.body.email,
        profilePic: req.body.image,
        number: req.body.number,
        owner: req.params.userID,
    };

    const newContact = new Contact(contact);
    await newContact.save();
    const userSaved = await User.findById(req.params.userID);
    userSaved.contacts.push(newContact);
    await userSaved.save();
    res.json(req.params.userID);
});

router.get("/:contactID", async (req, res) => {
    const contactSearched = await Contact.findById(req.params.contactID);
    res.json(contactSearched);
});

router.post("/:userID/edit/:contactID", async (req, res) => {
    const contactSearched = await Contact.findByIdAndUpdate(
        req.params.contactID,
        {
            "name.first": req.body.first,
            "name.last": req.body.last,
            email: req.body.email,
            profilePic: req.body.image,
            number: req.body.number,
        }
    );
    res.json(req.params.userID);
});

router.post("/:userID/delete/:contactID", async (req, res) => {
    const deleteContact = await Contact.findByIdAndDelete(req.params.contactID);
    const userSearched = await User.findByIdAndRemoveContact(
        req.params.userID,
        req.params.contactID
    );
    res.json(true);
});

module.exports = router;
