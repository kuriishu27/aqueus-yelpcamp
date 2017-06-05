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
// mongoose.connect('mongodb://localhost/yelp_camp_v3');
mongoose.connect('mongodb://accentPOS:AccentPOS123@cluster0-shard-00-00-dxgjl.mongodb.net:27017,cluster0-shard-00-01-dxgjl.mongodb.net:27017,cluster0-shard-00-02-dxgjl.mongodb.net:27017/Campgrounds?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(flash());

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


app.listen(process.env.PORT, process.env.IP, function() {
    console.log('YelpCamp server has started!');
});
