//import pool interface for postgres
var { Pool } = require('pg');

var CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:D3rgl!fe@localhost:5432/weather-db';
var SSL = process.env.NODE_ENV === 'production';

class Database {
    constructor () {
        // initialize private pool interface for db connection
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        // basic error handling if connection to postgres does not work
        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostrgreSQL client.', err);
            process.exit(-1);
        });
    }

    // query method for getting data from db
    query (query, ...args) {
        // use pool to connect to postgres
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            // if connection was successful, use acquired client from the pool to query db and return rows
            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });
    }

    // end postgres connection
    end () {
        this._pool.end();
    }
}

module.exports = new Database();