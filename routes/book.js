const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add-book', bookController.addBook);
router.get('/books', (req, res) => {
    res.json(books);
});


module.exports = router;