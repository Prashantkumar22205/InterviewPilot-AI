const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
     username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        default: null,
    },

    googleId: {
        type: String,
        default: null,
    },

    avatar: {
        type: String,
        default: "",
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
},{
    timestamps: true,
})

const userModel = mongoose.model("users",userSchema)

module.exports=userModel


