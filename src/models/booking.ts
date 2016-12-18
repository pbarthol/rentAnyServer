/**
 * Created by Peter on 06.12.2016.
 */
import mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookingSchema = new Schema({
    _id: Schema.ObjectId,
    userid: String,
    accommodationid: String,
    datefrom: Date,
    dateto: Date,
    createddate: Date
});
// Create a model based on the schema
let Booking = mongoose.model("Booking", bookingSchema);
export = Booking;