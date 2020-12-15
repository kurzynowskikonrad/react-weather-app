const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// import database class from ./database/index.js
var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

// initialize express and register middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// register api end points
app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

// if running in prod use built files
if (ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

// have express listen on provided port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!!`);
});

// use database class to query
db.query('SELECT NOW()', (err, res) => {
    if (err.error) 
        return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`)
});

module.exports = app;