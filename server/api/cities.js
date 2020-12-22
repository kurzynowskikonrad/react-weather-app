var express = require('express');

// import Cities class
var Cities = require('../models/cities');

// initialize express router
var router = express.Router();

// retrieve all Cities on HTTP GET
router.get('/', function (req, res) {
    Cities.retrieveAll(function (err, cities) {
        if (err)
            return res.json(err);
        return res.json(cities);
    });
});

// insert new city on HTTP POST
router.post('/', function (req, res) {
    var city = req.body.city;
 
    // Cities.checkDuplicate(city, function (err, result) {
    //     if (err)
    //         return res.json(err)
    //     console.log(result)
    // })

    Cities.insert(city, function (err, result) {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;