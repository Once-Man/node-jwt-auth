const Book = require('../models/book');

addBook = async(req, res) => {
    try{
        const book = new Book({
            author:req.body.author,
            country:req.body.country,
            language:req.body.language,
            price: req.body.price
        });
        const bookData = await book.save();
        res.status(200).send({
            status: "Successfully Added",
            message: "Ok you are created book.",
            data: {
                bookData
            }
        });
    }catch(error){
        console.log(error.message);
    }
}
module.exports = {
    addBook
}