const mongoose = require('mongoose');
const colors = require('colors')

function database() {
    mongoose
        .set('strictQuery', true)
        .connect(process.env.DATABASE_URI, {
            // userCreateIndex: true,
            // useNewUrlParser:true,
            // userUnifiedTopology:true,
        })
        .then(() => {
            console.log(`${'✔✔✔'.green}  ${'Hurray! mongoDB is connected'.green}`);
        })
        .catch((err) => {
            console.log(
                '====== An error occured while connecting to database ======= ' + err
            );
        });
}

module.exports = database;
