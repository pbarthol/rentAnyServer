/**
 * Created by Peter on 11.09.2016.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accommodationSchema = new Schema({
    _id: Schema.ObjectId,
    title: String,
    description: String,
    town: String,
    thumbnail: String,
    avatar: String,
    type: String,
    numberOfGuests: Number,
    price: Number,
    lat: Number,
    lng: Number,
    numberOfBeds: Number,
    numberOfBathrooms: Number,
    zipcode: String,
    canton: String,
    country: String,
    category: String,
    setting: {},
    rules: {},
    rulesText: String,
    headerImage: String,
    images: Number,
    username: String,
    distance: Number,
    sel: Boolean,
    ownerid: String
});
// Create a model based on the schema
var Accommodation = mongoose.model("Accommodation", accommodationSchema);
module.exports = Accommodation;
//# sourceMappingURL=accommodation.js.map