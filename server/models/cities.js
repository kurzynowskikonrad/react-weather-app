const db = require('../database');

// model for interacting with cities in the db
class Cities {
    // retrieve all cities from postgres
    static retrieveAll (callback) {
        db.query('SELECT city_name from cities', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // insert new city into postgres
    static insert (city, callback) {
        db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Cities;