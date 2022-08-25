const express = require('express')
const app = express()
// const connectionDB = the mongoose thing on config
const connectionDB = require('./config/database')
// home route
const homeRoute = require('./routes/home')
// book list route
const booksRoute = require('./routes/books')
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

connectionDB()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// to home route
app.get('/', homeRoute)
// to books route
app.get('/books', booksRoute)

app.post('/books/addBook', booksRoute)

app.put('/books/markRead', booksRoute)

app.put('/books/markUnread', booksRoute)

app.delete('/books/deleteBook', booksRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log('server running away from you')
})

