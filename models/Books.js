const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    bookAuthor: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('Book', BookSchema, 'books')