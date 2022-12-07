const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: false,
        },
        last: {
            type: String,
            require: false,
        },
    },
    email: String,
    age: Number,
    gender: String,
    document: Number,
    password: {
        type: String,
        required: true,
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
