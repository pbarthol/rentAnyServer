/**
 * Created by Peter on 20.11.2016.
 */
"use strict";
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
function login(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            // return res.status(403).send({error: 'Authenticaton failed, user not found.'});
            return res.status(403).send({ error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!' });
        }
        else {
            var userid_1 = user._id;
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: "24h" // expires in 24 hours
                    });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        userid: userid_1
                    });
                }
                else {
                    // return res.status(403).send({error: 'Authenticaton failed, wrong password.'});
                    return res.status(403).send({ error: 'Authentifizierung fehlgeschlagen. Benutzername oder Passwort falsch!' });
                }
            });
        }
    });
}
exports.login = login;
//# sourceMappingURL=loginController.js.map