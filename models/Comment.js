const mongoose = require("mongoose")
const { type } = require("os")
const { ref } = require("process")

// schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post" 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
},{
    timestamps: true,
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment 