const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {checkDuplicatedEmail,verifyLogin, getID} = require("../middlewares/loginAndSignUp");
const router = express.Router();

router.get("/:userID", async (req, res) => {
    const userSearched = await User.findById(req.params.userID)
    res.json(userSearched.populate("contacts"))
});

router.get("/login", (req, res) =>{
    res.json(req.session.userID);
})

router.post("/login", async (req, res) =>{
    const person = {email: req.body.email, password: req.body.password};

    if (await verifyLogin(person)) {
        req.session.userID = await getID(person);
        await res.json(req.session.userID)
    } else {
        res.json(false);
    }
})

router.get("/register", (req, res) =>{
    res.json(req.session.userID);
})

router.post("/register", async (req, res) =>{
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
        await newUser.save()
        req.session.userID = await getID(person);
        res.json(req.session.userID)
    } else {
        res.json(false);
    }
})

router.get("/logout", (req, res) => {
    res.json(req.session.userID);
})

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;
