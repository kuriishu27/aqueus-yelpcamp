// all the middleware goes here
var middlewareObj = {};
var Campground = require('../models/campground')
var Comment = require('../models/comment')

middlewareObj.isCampgroundOwner = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                   res.redirect('back');
            } else {
            // does user own the campground?
            if (foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash('error', 'You dont have permission to do that');
                res.redirect('back');
            }
        }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.isCommentOwner = function (req, res, next){
    if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err) {
                    req.flash('error', 'Campground not found');
                    res.redirect('back');
                } else {
                    if (foundComment.author.id.equals(req.user._id)) {
                        req.flash('error', 'Permission DENIED: No permission to do that');
                        next();
                    } else {
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that');
            res.redirect('back');
        }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
};

module.exports = middlewareObj;