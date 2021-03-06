var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds123933.mlab.com:23933/yelpcamp');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(flash());


// Use seedDB to create dummy test data files
// seedDB(); // seed the database

// PASSPORT CONFIGURATION

app.use(require('express-session')({
    secret: 'I am determined',
    resave: false,
    saveUninitialised: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

var PORT = 8080
app.listen(process.env.PORT || PORT, process.env.IP, function() {
    console.log(process.env.IP);
    console.log('YelpCamp server has started!');
});