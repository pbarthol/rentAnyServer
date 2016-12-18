/**
 * Created by Peter on 13.11.2016.
 */
import mongoose = require('mongoose');

let Schema = mongoose.Schema;
let uploadSchema = new Schema({
    originalname: String,
    storagename: String
});

// Create a model based on the schema
let Upload = mongoose.model("Upload", uploadSchema);
export = Upload;
