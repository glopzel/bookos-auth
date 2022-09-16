const express = require('express')
const app = express()
const connectionDB = require('./config/database')
const homeRoute = require('./routes/home')
const booksRoute = require('./routes/books')
const dotenv = require('dotenv');
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const homeControl = require('./controllers/homeControl')

dotenv.config({ path: './config/.env' });
require('./config/passport')(passport)

connectionDB()

// ejs for views
app.set('view engine', 'ejs')
app.use(express.static('public'));
// body parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// logging
app.use(logger('dev'))

// SESSION, store the session in mongodb
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ 
            mongoUrl: process.env.DB_STR
        }) 
    })
)

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// to home route
app.get('/', homeRoute)
// to books route
app.get('/books', booksRoute)
app.post('/books/addBook', booksRoute)
app.put('/books/markRead', booksRoute)
app.put('/books/markUnread', booksRoute)
app.delete('/books/deleteBook', booksRoute)

// check signups
// LOGIN
app.get('/login', homeRoute)
app.post('/login', homeRoute)
// LOGOUT
app.get('/logout', homeRoute)
// SIGN UP
app.get('/signup', homeRoute)
app.post('/signup', homeRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log('server running away from you')
})

