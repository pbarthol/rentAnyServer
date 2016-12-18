"use strict";
/**
 * Created by Peter on 13.11.2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uploadSchema = new Schema({
    originalname: String,
    storagename: String
});
// Create a model based on the schema
var Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
//# sourceMappingURL=upload.js.map