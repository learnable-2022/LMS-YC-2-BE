const express = require('express');

const session = require('express-session');
//const cloudinary = require('cloudinary').v2;

const MongoStore = require('connect-mongo');
const passport = require('passport')
const initialise = require('./src/middleware/authenticate')

const colors = require('colors');
const database = require('./src/database/db')
const app = express();
app.use(express.urlencoded({ extended: true }))
const Users = require('./src/model/user.model');
const Admin = require('./src/model/admin.model');
const { } = process.env

require('dotenv').config();
const cors = require('cors');
app.use(cors());
const router = require('./src/routes/index.routes')
const PORT = process.env.PORT

initialise(passport, Users, Admin)
// Set up express-session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI, collectionName: "sessions" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Set up Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// cloudinary.config({
//     cloud_name: process.env,
//     api_key: process.env.CLOUDINARY_api_key,
//     api_secret: process.env.CLOUDINARY_api_secret_key
// });

// use the routes
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`🚀 ${'Server up and running'.green}`);
    database();
});