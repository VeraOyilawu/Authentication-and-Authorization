const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "username is required"],
        unique: true
    }, 

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "paasword is required"]
    },
    isAdmin: {
        type: Boolean, 
        default: false
    },
    token: {
        type: String,
    }
})

const userModel = mongoose.model("userdetails", userSchema)

module.exports = userModel