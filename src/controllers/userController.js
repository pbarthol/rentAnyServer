/**
 * Created by Peter on 16.10.2016.
 */
"use strict";
// import crypto = require('crypto');
// import mongoose = require('mongoose');
var mongoose = require('mongoose');
var User = require("../models/user");
var moment = require('moment');
var ObjectId = mongoose.Types.ObjectId;
function getUser(req, res) {
    console.log('get User Request');
    var id = req.params.id;
    console.log(typeof (id));
    console.log("User Id: " + id);
    var idObj = ObjectId(id);
    console.log(typeof (id));
    console.log("User Id: " + id.valueOf());
    User.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
        }
        if (doc) {
            var user = doc;
            console.log("User found");
            res.json(user);
            console.log(user);
        }
        else {
            console.log("No found");
            console.log(doc);
        }
    });
}
exports.getUser = getUser;
function changePassword(req, res) {
    // var newUser = req.body.user;
    console.log(req.body);
    console.log(req.body.pwdModel);
    var pwdModel = req.body.pwdModel;
    var idObj = ObjectId(pwdModel.userid);
    User.findById(idObj, function (err, user) {
        if (err)
            throw err;
        console.log("Username: " + req.body.username);
        if (!user) {
            return res.status(403).send({ error: 'Authentifizierung fehlgeschlagen!' });
        }
        else {
            console.log("Password: " + req.body.password);
            console.log("UserId: " + user.userid);
            user.comparePassword(pwdModel.oldpwd, function (err, isMatch) {
                if (isMatch && !err) {
                    // save new Password
                    user.password = pwdModel.newpwd;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            // return res.status(500).send({success: false, msg: 'User save() failed.'});
                            return res.status(500).send({ error: 'Passwortwechsel fehlgeschlagen!' });
                        }
                        return res.json(user);
                    });
                }
                else {
                    return res.status(403).send({ error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!' });
                }
            });
        }
    });
}
exports.changePassword = changePassword;
function addUser(req, res) {
    // var newUser = req.body.user;
    console.log(req.body);
    console.log(req.body.user);
    var newUser = new User(req.body.user);
    console.log(newUser);
    User.findOne({ username: newUser.username }, function (err, user) {
        if (err) {
            console.log(err);
            // return res.status(500).send({success: false, msg: 'Error at search the user.'});
            return res.status(500).send({ error: 'Fehler beim Benutzer suchen!' });
        }
        if (user) {
            console.log('username already taken');
            // return res.status(500).send({success: false, msg: 'Username already taken.'});
            return res.status(500).send({ error: 'Benutzername bereits vergeben!' });
        }
        else {
            User.findOne({ email: newUser.email }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    console.log('email already taken');
                    // return res.status(500).send({success: false, msg: 'Email already taken.'});
                    return res.status(500).send({ error: 'E-Mail bereits vergeben!' });
                }
                else {
                    // append date stamp when record was created //
                    newUser.createddate = moment().format();
                    newUser._id = ObjectId();
                    newUser.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            // return res.status(500).send({success: false, msg: 'User save() failed.'});
                            return res.status(500).send({ error: 'User save() failed.' });
                        }
                        return res.json(user);
                    });
                }
            });
        }
    });
}
exports.addUser = addUser;
//# sourceMappingURL=userController.js.map