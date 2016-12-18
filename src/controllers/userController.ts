/**
 * Created by Peter on 16.10.2016.
 */

"use strict";
import bcrypt = require('bcryptjs');
import crypto = require('crypto');
import mongoose = require('mongoose');
import User     = require("../models/user");
import moment 	= require('moment');
import jwt  = require('jsonwebtoken');
import config = require('../config/database');
import fs = require('fs');
import Upload = require("../models/upload");
let ObjectId = mongoose.Types.ObjectId;

export function getUser(req, res)
{
    console.log('get User Request');
    var id = req.params.id;
    console.log(typeof(id));
    console.log("User Id: " + id);
    var idObj = ObjectId(id);
    console.log(typeof(id));
    console.log("User Id: " + id.valueOf());
    User.findById(idObj, function (err, doc) {
        if (err) {
            // return res.send('Error');
            console.log(err);
            // return next(err);
        }
        if (doc) {
            let user = doc;
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

export function changePassword(req, res) {
    // var newUser = req.body.user;
    console.log(req.body);
    console.log(req.body.pwdModel);
    var pwdModel = req.body.pwdModel;
    var idObj = ObjectId(pwdModel.userid);
    User.findById(idObj, function (err, user) {
        if (err) throw err;
        console.log("Username: "+req.body.username);
        if(!user){
            return res.status(403).send({error: 'Authentifizierung fehlgeschlagen!'});
        }
        else {
            console.log("Password: "+ req.body.password);
            console.log("UserId: "+ user.userid);
            user.comparePassword(pwdModel.oldpwd, function(err, isMatch){
                if(isMatch && !err) {
                    // save new Password
                    user.password = pwdModel.newpwd;
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            // return res.status(500).send({success: false, msg: 'User save() failed.'});
                            return res.status(500).send({error: 'Passwortwechsel fehlgeschlagen!'});
                        }
                        return res.json(user);
                    })
                }
                else {
                    return res.status(403).send({error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!'});
                }
            })
        }
    })}

export function addUser(req, res) {
    // var newUser = req.body.user;
    console.log(req.body);
    console.log(req.body.user);
    var newUser = new User(req.body.user);
    console.log(newUser);
    User.findOne({username: newUser.username}, function (err, user) {
        if (err) {
            console.log(err);
            // return res.status(500).send({success: false, msg: 'Error at search the user.'});
            return res.status(500).send({error: 'Fehler beim Benutzer suchen!'});
        }
        if (user) {
            console.log('username already taken');
            // return res.status(500).send({success: false, msg: 'Username already taken.'});
            return res.status(500).send({error: 'Benutzername bereits vergeben!'});
        }
        else {
            User.findOne({email: newUser.email}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    console.log('email already taken');
                    // return res.status(500).send({success: false, msg: 'Email already taken.'});
                    return res.status(500).send({error: 'E-Mail bereits vergeben!'});
                }
                else {
                    saltAndHash(newUser.password, function (hash) {
                        newUser.password = hash;
                        // append date stamp when record was created //
                        newUser.createddate = moment().format();
                        newUser._id = ObjectId();
                        newUser.save(function (err, user) {
                            if (err) {
                                console.log(err);
                                // return res.status(500).send({success: false, msg: 'User save() failed.'});
                                return res.status(500).send({error: 'Benutzer speichern fehlgeschlagen!'});
                            }
                            return res.json(user);
                        })
                    })
                }
            })
        }
    })
}

var generateSalt = function()
{
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var saltAndHash = function(password, callback)
{
    var salt = generateSalt();
    callback(salt + md5(password + salt));
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
    // return bcrypt.createHash('md5').update(str).digest('hex');
}

var validatePassword = function(plainPass, hashedPass, callback)
{
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}