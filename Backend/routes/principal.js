const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
    checkDuplicatedEmail,
    verifyLogin,
    getID,
} = require("../middlewares/loginAndSignUp");
const router = express.Router();
let userID = false;

router.get("/home/:userID", async (req, res) => {
    const userSearched = await User.findById(req.params.userID);
    if (userSearched !== null) {
        return res.json(userSearched);
    }
    return res.json(false);
});

router.get("/home/contactsApi/:userID", async (req, res) => {
    const contacts = await User.findById(req.params.userID).populate("contacts");
    await res.json(contacts.contacts);
});

router.get("/session", async (req, res) => {
    res.json(userID);
});

router.get("/login", (req, res) => {
    res.json(userID);
});

router.post("/login", async (req, res) => {
    const person = { email: req.body.email, password: req.body.password };

    if (await verifyLogin(person)) {
        userID = await getID(person);
        await res.json(userID);
    } else {
        res.json(false);
    }
});

router.get("/register", (req, res) => {
    res.json(userID);
});

router.post("/register", async (req, res) => {
    const person = {
        "name.first": req.body.first,
        "name.last": req.body.last,
        age: req.body.age,
        gender: req.body.age,
        document: req.body.document,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };

    if (await checkDuplicatedEmail(person)) {
        const newUser = new User(person);
        await newUser.save();
        userID = await getID(person);
        res.json(userID);
    } else {
        res.json(false);
    }
});

router.get("/logout", (req, res) => {
    userID = false;
    req.session.destroy();
    res.json(req.session.userID);
});

router.post("/logout", (req, res) => {
    res.redirect("/login");
});

module.exports = router;
