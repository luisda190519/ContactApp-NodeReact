const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.checkDuplicatedEmail = async function (user) {
    const userSearched = await User.findOne({ email: user.email });

    if (userSearched === null) {
        return true;
    }

    return false;
};

module.exports.verifyLogin = async function (user) {
    const userSearched = await User.findOne({ email: user.email });

    if (!(userSearched === null)) {
        if (bcrypt.compareSync(user.password, userSearched.password)) {
            return true;
        }
    }

    return false;
};

module.exports.getID = async function (user) {
    const userSearched = await User.findOne({ email: user.email });
    return userSearched.id;
};
