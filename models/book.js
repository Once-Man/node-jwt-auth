const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    author:String,
    country:String,
    language:String,
    price: Number
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;