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
        owner: req.params.userID,
    };

    const newContact = new Contact(contact);
    await newContact.save();
    const userSaved = await User.findById(req.params.userID)
    userSaved.contacts.push(newContact)
    await userSaved.save();
    res.json(newContact.id)
});

module.exports = router;
