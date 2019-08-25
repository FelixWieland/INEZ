/**
 *  Include all Models
 */
var model = require("./config/dbModels");

/**
 *  Get the required credential data.
 */
const fs = require('fs');

let rawdata = fs.readFileSync('./config/credentials.json');
let credentials = JSON.parse(rawdata);
const MONGO_URI=credentials.mongo.srv;


/**
 *  Establish the connection to the mongoDb via mongoose
 */
const mongoose = require('mongoose');
mongoose.connect(MONGO_URI,{ useNewUrlParser: true});




/**
 *  create a user, gives back a null for success and a err in case of a failure
 */
var createUser = function(name, password_hash, done){
	console.log("createUser: name: " + name +" pwhash " +password_hash);
	var user = new model.user({name: name, password_hash : password_hash});
	user.save(function(err, data){
		if (err)
			return done(err);
		return done(null,data);
	});
}

/**
 *  Get a user by name without hash
 *  returns null or the user
 */
var getUser = function (name, done){
	model.user.findOne({name: name}, function(err, data){
		if(err)
			return done(null);
		else
			data.password_hash=null;
		return done(null, data);
	});
}

/**
 *  Get a passwordhash from user by name
 *  returns null or the userpassword
 */
var getPasswordhash = function (name){
	model.user.findOne({name : name}),function (err, data) {
		if (err) return null
		return data.password_hash;
	}
}

/**
 * Delete a user by name
 * their is no return
 */
var deleteUser = function(name){
	model.user.findOne({name: name}, function ( err, data) {
		if (err) return err;
		data.remove();
		return null;
	})
}

/**
 *  Export all functions for the database
 */
module.exports = {
	createUser : createUser,
	getUser: getUser,
	getPasswordhash: getPasswordhash,
	deleteUser: deleteUser
}
