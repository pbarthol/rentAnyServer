/**
 * Created by Peter on 20.11.2016.
 */

import User = require('../models/user');
import jwt  = require('jsonwebtoken');
import config = require('../config/database');

export function login(req, res) {
    User.findOne({username: req.body.username}, function(err, user){
        if (err) throw err;
        if(!user){
            // return res.status(403).send({error: 'Authenticaton failed, user not found.'});
            return res.status(403).send({error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!'});
        }
        else {
            let userid = user._id;
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: "24h" // expires in 24 hours
                    });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        userid: userid
                    });
                    // var token = jwt.encode(user, config.secret);
                    // res.json({success: true, token: token});
                }
                else {
                    // return res.status(403).send({error: 'Authenticaton failed, wrong password.'});
                    return res.status(403).send({error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!'});
                }
            })
        }
    })}