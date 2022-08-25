const express = require('express');
const router = express.Router()
const booksController = require('../controllers/booksControl')

router.get('/books', booksController.getBooks)

router.post('/books/addBook', booksController.addBook)

router.put('/books/markRead', booksController.markRead)

router.put('/books/markUnread', booksController.markUnread)

router.delete('/books/deleteBook', booksController.deleteBook)

module.exports = router