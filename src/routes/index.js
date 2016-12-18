var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var accommodations = require("../controllers/accommodationController");
var users = require("../controllers/userController");
var login = require('../controllers/loginController');
var booking = require("../controllers/bookingController");
var Upload = require('../models/upload');
var User = require("../models/user");
// var uploads = require("../controllers/uploadController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/accommodation", accommodations.addAccommodation);
router.get("/accommodationlist", accommodations.getAccommodationList);
router.get("/accommodation/:id", accommodations.getAccommodation);
router.get("/user/:id", users.getUser); // used query parameter
router.post("/user", users.addUser);
router.post("/user/changepassword", users.changePassword);
router.post("/login", login.login);
router.post("/booking", booking.addBooking);
router.get("/booking/:id", booking.getBooking);
router.get("/bookings", booking.getAllBookings);
router.get("/bookings/user/:id", booking.getUserBookings);
router.get("/bookings/accommodation/:id", booking.getAccoommodationBookings);

// router.put("/user", function updateUser(req, res) {
router.post("/user/update", function updateUser(req, res) {
  console.log("Update User started");
  var user = req.body.user;
  // First delete already saved avatar file
  var avatarPathFile = path.join("D:\\CAS-FEE\\Server\\public\\uploads\\", user._id, ".jpg");

  fs.stat(avatarPathFile, function(err, stat) {
    if(err == null || err.code == 'ENOENT' ) {
      if (err == null) {
        // delete "old" file
        fs.unlink(avatarPathFile, function (err) {
          if (err) throw err;
        })
      }
      // Rename avatar file on system
      var originalFileName = user.avataroriginal;
      Upload.findOne({originalname: originalFileName}, function (err, oneUpload) {
        if (err) return res.send(500, {error: err});
        if (oneUpload) {
          // uploaded file entry found
          var fullPath = oneUpload.storagename;
          var storagedFileName = fullPath.replace(/^.*[\\\/]/, '');
          var dirname = fullPath.match(/(.*)[\/\\]/)[1] || '';
          var renamedFile = path.join(dirname, user._id + ".jpg")
          fs.rename(fullPath, renamedFile, function (err) {
            if (err) throw err;
            fs.stat(renamedFile, function (err, stats) {
              if (err) throw err;
              else {
                console.log('stats: ' + JSON.stringify(stats));
                // Delete Upload Record
                Upload.remove({originalname: originalFileName}, function (err) {
                  if (err) {
                    console.log("Upload Delete Error:")
                    console.log(err);
                    // return res.status(500).send({error: 'Upload delete failed.'});
                    return res.status(500).send({error: 'Upload des Bildes fehlgeschlagen!'});
                  }
                  else {
                    user.avatar = 'http://localhost:8080/uploads/' + user._id + ".jpg";
                    var query = {'_id': user._id};
                    User.findOneAndUpdate(query, user, function (err, user) {
                      if (err)
                        return res.send(500, { error: err });
                      else {
                        // return res.send(200, JSON.stringify(user));
                        res.send(JSON.stringify(user));
                      }
                    });
                  }
                });
              }
            });
          });
        }
      })
    }
    else {
      console.log('Some other error: ', err.code);
    }
  });

})



module.exports = router;
