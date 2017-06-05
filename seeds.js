var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Cloud Hill', 
        image: 'https://www.thecarpeople.co.uk/umbraco-media/Entry_432/fb02de5b-a964-4836-8105-64af05e94006.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        name: 'Sephirot Creek', 
        image: 'https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        name: 'Rinoa Realm', 
        image: 'https://s3-us-west-2.amazonaws.com/hispotion-prod/wp-content/uploads/2017/05/31-05101657f53d1a399b7051016886742565-31.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        name: 'Squall\'s Hideout', 
        image: 'http://www.telegraph.co.uk/content/dam/Travel/leadAssets/26/62/extreme3_2662527a-large.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
    ];

function seedDB(){
    // REMOVE ALL Campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('removed campgrounds!');
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        Comment.create({
                            text: 'This is great but there is no internet!', 
                            author: 'Homer'
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("=======!==========");
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment');
                            }
                        });
                    }
            });
        });
    }
});

}

module.exports = seedDB;
