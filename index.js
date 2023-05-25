const express = require('express');
const session = require('express-session');
const passport = require('./src/middleware/authenticate')
const colors = require('colors');
const database = require('./src/database/db')
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const router = require('./src/routes/index.routes')

const PORT = process.env.PORT


// Set up express-session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

// Set up Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use the routes
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`🚀 ${'Server up and running'.green}`);
    database();
});