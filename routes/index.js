var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require('../models/user');

var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.get('/', function(req, res) {
    res.render('landing');
});

// SHOW register form
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});


// SHOW login form
router.get('/login', function(req, res) {
    res.render('login', {message: req.flash('error')});
});

// handle login logic
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) {
});

// LOGOUT ROUTE
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});

module.exports = router;
