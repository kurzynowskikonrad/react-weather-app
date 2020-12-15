var express = require('express');
var Weather = require('../models/weather');

// initialize express router
var router = express.Router();

// retrieve weather data on HTTP GET /api/weather/{city}
router.get('/:city', function (req, res) {
    var city = req.params.city;

    Weather.retrieveByCity(city, function (err, weather) {
        if (err)
            return res.json(err);
        return res.json(weather);
    });
});

module.exports = router;