const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },

},
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)