const Book = require('../models/Books');

module.exports = {
    // get all books by user
    getBooks: async (req, res) => {
        try {
            const allBooks = await Book.find({userId: req.user.id})
            const booksLeft = await Book.countDocuments({userId: req.user.id, read: false})
            
            // const booksUnread = await Book.countDocuments({read: false})
            res.render('books.ejs', {
                user: req.user,
                totalBooks: allBooks, 
                booksToRead: booksLeft
            })
        } catch(err) {
            console.log(err)
        }
    },
    // add 1 book to the db, create the item
    addBook: async (req, res) => {
        try {
            await Book.create({
                bookTitle: req.body.bookTitle, 
                bookAuthor: req.body.bookAuthor, 
                read: false,
                userId: req.user.id
            })
            res.redirect('/books')
        } catch(err) {
            if (err) return res.status(500).send(err);
            res.redirect("/books");
        }
    },

    // markRead: 'update 1 book read/likes',
    markRead: async (req, res) => {
        try {
            await Book.findOneAndUpdate({_id: req.body.bookReadID}, {
                read: true
            })
            console.log('marked as read')
            res.json('Marked as read')
        } catch(err) {
            console.log(err)
        }
    },

    // mark unread
    markUnread: async (req, res) => {
        try {
            await Book.findOneAndUpdate({_id: req.body.bookReadID}, {
                read: false
            })
            console.log('marked as unread')
            res.json('Marked as read')
        } catch(err) {
            console.log(err)
        }
    },
    // delete
    deleteBook: async (req, res) => {
        try {
            await Book.findByIdAndDelete({_id: req.body.bookDeleteID})
            console.log('deleted book')
            res.json('deleted it')
        } catch(err) {
            console.log(err)
        }
    },
    
}