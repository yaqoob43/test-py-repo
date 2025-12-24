const mongoose = require("mongoose")

const MoviesList = new mongoose.Schema({
     title: String,
    genre: String,
    rating : {
        type : Number,
        min:0, 
        max:5}
})
module.exports = mongoose.model("lists",MoviesList )