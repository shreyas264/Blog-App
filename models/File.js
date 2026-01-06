const mongoose = require("mongoose")
const { type } = require("os")
const { ref } = require("process")

// schema
const fileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
},{
    timestamps: true,
})

const File = mongoose.model("Media", fileSchema)
module.exports = File 