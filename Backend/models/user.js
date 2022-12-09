const mongoose = require("mongoose");
const Contact = require("../models/contact");

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

userSchema.static("findByIdAndRemoveContact", async function (userID, contactID) {
    const userSearched = await this.findById(userID)
    for( let i = 0; i < userSearched.contacts.length; i++){ 
        if ( userSearched.contacts[i]._id.toString() === contactID) { 
            userSearched.contacts.splice(i, 1); 
        }
    }
    return userSearched.save();
});

module.exports = mongoose.model("User", userSchema);
