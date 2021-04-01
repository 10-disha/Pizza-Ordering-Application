require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')


const {
    connect
} = require('http2')

//Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});



//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//by default session will be stored in memory but u should store in database for that use connect mongo 
//jab tak cookie valid hai session bhi valid rahega 
//Session config
//secret is used for session for cookies as it needs secret key
//secret key will be stored in an environment file which is kept in nodes dont write hear
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    } //this will take life time of cookie in milliseconds
})) //this is 24 hours

//Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())



app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})