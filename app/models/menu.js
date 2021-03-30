//database model of menu

//fetching database
const mongoose = require('mongoose')

const Schema = mongoose.Schema //this is constructor

//calling constructor
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model(`Menu`, menuSchema)