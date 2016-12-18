/**
 * Created by Peter on 03.11.2016.
 */
import Upload = require('../models/upload');

export function addUploadRecord(req, res){
    let upload = new Upload();
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




