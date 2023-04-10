const mongoose = require("mongoose");
const validator = require("validator");
const userModel = mongoose.model("user", {
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        lowercase: true,
        maxLength: 100,
        required: true
    },

    // status: {
    //     type: Boolean,
    //     default: false
    // },
    // date: {
    //     type: Date,
    //     default: new Date()
    // }
});

module.exports = userModel;
