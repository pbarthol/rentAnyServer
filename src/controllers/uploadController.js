"use strict";
/**
 * Created by Peter on 03.11.2016.
 */
var Upload = require('../models/upload');
function addUploadRecord(req, res) {
    var upload = new Upload();
    upload.originalname = req.file.originalname;
    upload.storagename = req.file.path;
    upload.save(function (err, upload) {
        if (err) {
            console.error(err);
            return res.send(err);
        }
        // return res.send(upload.toJSON());
    });
}
exports.addUploadRecord = addUploadRecord;
//# sourceMappingURL=uploadController.js.map