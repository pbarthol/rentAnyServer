/**
 * Created by Peter on 21.08.2016.
 */
"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id: Schema.ObjectId,
    username: String,
    password: String,
    firstname: { type: String, default: "First Name" },
    lastname: String,
    email: String,
    avatar: { type: String, default: "avatar" },
    avataroriginal: String,
    createddate: Date,
    admin: Boolean
});
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
userSchema.methods.comparePassword = function (passw, callback) {
    console.log("Compare Password");
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        if (isMatch)
            console.log("Password ok");
        else
            console.log("Wrong Password");
        callback(null, isMatch);
    });
};
// Create a model based on the schema
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map