"use strict";
/**
 * Created by Peter on 06.12.2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookingSchema = new Schema({
    _id: Schema.ObjectId,
    userid: String,
    accommodationid: String,
    datefrom: Date,
    dateto: Date,
    createddate: Date
});
// Create a model based on the schema
var Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
//# sourceMappingURL=booking.js.map