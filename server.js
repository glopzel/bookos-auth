const express = require('express')
const app = express()
// const connectionDB = the mongoose thing on config
const connectionDB = require('./config/database')
// ROUTES
const homeRoute = require('./routes/home')
const booksRoute = require('./routes/books')

const dotenv = require('dotenv');
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
// const MongoStore = require('connect-mongo')(session)
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const homeControl = require('./controllers/homeControl')


dotenv.config({ path: './config/.env' });
require('./config/passport')(passport)

connectionDB()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(logger('dev'))

// SESSION
app.use(
    session({
        // idk this was in the documentation lets trust the process
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // store: new MongoStore({ mongooseConnection: mongoose.connection }) 
        store: new MongoStore({ 
            // mongooseConnection: mongoose.connection,
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

