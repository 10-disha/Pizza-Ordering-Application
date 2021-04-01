//database model of user

//fetching database
const mongoose = require('mongoose')

const Schema = mongoose.Schema //this is constructor

//calling constructor
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        dafault: 'customer',
    },

}, {
    timestamps: true
})

module.exports = mongoose.model(`User`, userSchema)