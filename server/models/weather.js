const request = require('request-promise');

const API_KEY = '4da5a58e2ba45dee854dbe39c433e721';
const API_KEY_ENV = process.env.REACT_APP_OWM_API;

// use the request method to retrieve data from open weather map api
class Weather {
    static retrieveByCity (city, callback) {
        request({
            uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherMap API.'});
        })
    }
}

module.exports = Weather;
