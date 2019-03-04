const request = require('request-promise');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const config = require('../config');
const User = require('../models/User');
const Booking = require('../models/Booking');


// API keys for Dark Sky API and Google Geolocation API
var geocodingAPI_KEY = config.GoogleGeolocationAPI;
var geocodingAPI_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var weatherAPI_KEY = config.DarkSkyAPI;
var weatherAPI_URL = 'https://api.darksky.net/forecast/'

// path for the app client to get weather info
router.post("/weatherform", (req, res) => {
    let dateString = req.body.date
    dateString = dateString.substring(0,dateString.length-5);
    let time = new Date(dateString);
    var geocodingAPI_FULL = geocodingAPI_URL + req.body.address 
        + '&key=' + geocodingAPI_KEY;
    // connect to Google Geolocation API and get coordinates of the address
    request({
        uri: geocodingAPI_FULL,
        json: true
    })
    .then((data) => {
        var coords = [data.results[0].geometry.location.lat,
                data.results[0].geometry.location.lng];
        time = time.getTime()/1000;
        var weatherAPI_FULL = weatherAPI_URL + weatherAPI_KEY + 
            '/' + coords[0] + ',' + coords[1] + ',' + time + 
            '?exclude=currently,minutely,daily,alerts,flags&units=auto';
        // connect to Dark Sky API and get forecast for given addres
        request({
            uri: weatherAPI_FULL,
            json: true
        })
        .then((data) => {
            var data_hourly=data.hourly.data;
            var index=0;
            console.log(data_hourly);
            // find the selected time block in 24h weather forecast data
            for (let i = 0; i < data_hourly.length; i++) {
                if(data_hourly[i].time >= time){
                    time = data_hourly[i].time;
                    index = i;
                    break;
                }
                else{
                    // in case user selected time in range 23:01-23:59
                    index=23;
                }
                
            }
            res.status(200).send({"message": data_hourly[index]});
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
                weatherSettings: [20, 5, 0.4, 10, 10, 0.1, 0, 20, 0.1]
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                                avatar: user.avatar,
                                date: user.date,
                                weatherSettings: user.weatherSettings
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.id)
        .then(userFound => {
            if (!userFound) return res.status(404).end();
            return res.status(200).json(userFound);
        })
        .catch(err => {
            console.log(err);
        })
    
    return req.user;
});

router.post('/updatesettings', (req, res) => {
    User.findOneAndUpdate(
        {email: req.body.email}, 
        {weatherSettings: req.body.settings},
        {new: true},
        (err, updatedDoc) => {
            if(err) {
                return res.status(500).send(err);
            }
            return res.send(updatedDoc);
        }
        );
});

router.post('/getsettings', (req, res) => {
    User.findOne(
        {email: req.body.email}, 
        (err, updatedDoc) => {
            if(err) {
                return res.status(500).send(err);
            }
            return res.send(updatedDoc);
        }
    );
});

router.post('/getbookings', (req, res) => {
    Booking.find(
        {email: req.body.email}, 
        (err, docs) => {
            if(err) {
                return res.status(500).send(err);
            }
            return res.send(docs);
        }
    );
});

router.post('/addbooking', (req, res) => {
    const newBooking = new Booking({
        address: req.body.address,
        email: req.body.email,
        date: req.body.date,
        activity: req.body.activity
    })
    newBooking.save((err, booking) => {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(booking);
    })
});


module.exports = router;
