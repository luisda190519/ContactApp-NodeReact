const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    profilePic: String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Contact", contactSchema);
