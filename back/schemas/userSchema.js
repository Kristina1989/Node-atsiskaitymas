const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: Array
})

module.exports = mongoose.model("Users", userSchema)