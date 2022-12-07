const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(req.session.userID)
});

module.exports = router;
