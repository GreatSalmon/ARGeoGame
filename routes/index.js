var express = require('express');
var router = express.Router();

function SendAllGeoLocsUpdated(req,res){
    var db = req.db;
    var collection = db.get('usercollection');

    //var usersgeoloc = collection.find().lean();


    collection.find({})
        .on('success', 
            function (doc) {
                /* doc is the result available here */ 
                res.json(doc);

        });

    // collection.find(function(err, users) {
    //         if (err)
    //             res.send(err);

    //         res.json(users);
    // });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newuser', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist?userName="+userName);
        }
    });
});

/* POST to update geo location */
router.post('/updategeoloc', function(req, res) {

	// Set our internal DB variable
    //console.log("hello");
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var lat = req.body.lat;
    var lon = req.body.lon;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update(
    	{ "username" : userName },
    	{
    		$set: {"lat": lat, "lon": lon}
    	},
    	function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database. error: "+ err);
        }
        else {
            // And forward to success page
            SendAllGeoLocsUpdated(req,res);
        }
    }
    );

});

module.exports = router;
