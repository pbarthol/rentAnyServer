/**
 * Created by Peter on 21.08.2016.
 */
"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Accommodation = require("../models/accommodation");
//import repository = acoommodationModel.repository;
function addAccommodation(req, res) {
    var accommodation = new Accommodation();
    accommodation._id = ObjectId();
    accommodation.title = req.body.accommodation.title;
    accommodation.description = req.body.accommodation.description;
    accommodation.town = req.body.accommodation.town;
    accommodation.thumbnail = req.body.accommodation.thumbnail;
    accommodation.avatar = req.body.accommodation.avatar;
    accommodation.type = req.body.accommodation.type;
    accommodation.numberOfGuests = req.body.accommodation.numberOfGuests;
    accommodation.price = req.body.accommodation.price;
    accommodation.lat = req.body.accommodation.lat;
    accommodation.lng = req.body.accommodation.lng;
    accommodation.numberOfBeds = req.body.accommodation.numberOfBeds;
    accommodation.numberOfBathrooms = req.body.accommodation.numberOfBathrooms;
    accommodation.zipcode = req.body.accommodation.zipcode;
    accommodation.canton = req.body.accommodation.canton;
    accommodation.country = req.body.accommodation.country;
    accommodation.category = req.body.accommodation.category;
    accommodation.setting = req.body.accommodation.setting;
    accommodation.rules = req.body.accommodation.rules;
    accommodation.rulesText = req.body.accommodation.rulesText;
    accommodation.headerImage = req.body.accommodation.headerImage;
    accommodation.images = req.body.accommodation.images;
    accommodation.username = req.body.accommodation.username;
    accommodation.distance = req.body.accommodation.distance;
    accommodation.sel = req.body.accommodation.sel;
    accommodation.ownerid = req.body.accommodation.ownerid;
    accommodation.save(function (err, accommodation) {
        if (err)
            return console.error(err);
        return res.json(accommodation);
    });
}
exports.addAccommodation = addAccommodation;
function getAccommodation(req, res) {
    var id = req.params.id;
    var idObj = ObjectId(id);
    Accommodation.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
        }
        if (doc) {
            var accommodation = doc;
            res.json(accommodation);
        }
        else {
            console.log("No found");
            console.log(doc);
        }
    });
}
exports.getAccommodation = getAccommodation;
function getAccommodationList(req, res) {
    Accommodation.find(function (err, accommodations) {
        if (err) {
            return res.send('err');
        }
        return res.json(accommodations);
    });
}
exports.getAccommodationList = getAccommodationList;
//# sourceMappingURL=accommodationController.js.map