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
var getPasswordhash = function (name,done){
	model.user.findOne({name : name},function (err, data) {
		if (err) return done(err);
		return done(null, data.password_hash);
	});
}

/**
 * Delete a user by name
 * return is a error a true
 */
var deleteUser = function(name,done){
	model.user.findOne({name: name}, function ( err, data) {
		if (err) return done (err);
		else{
			if(data!=null)
				data.remove();
			return done(null, true);
		}
	})
}

/** createShoppingList
 *  this function will return the JSON of a shoppingList or a Error
 */
var createShoppingList = function(userName, listname , done){


		var shoppingList= new model.shopping_List({list_name: listname});
		shoppingList.save(function(err, listData){
			if (err)
				return done(err);
			else{
				model.user.findOne({name: userName}, function ( err, data) {
					if (err) return done (err);
					else{
						if(data!=null){
							data.shopping_lists.push(listData._id);
							data.save();
						}

						return done(null, listData);
					}
				})
			}
		});
	}
/**
 * DeleteShoppingList
 * this function will delete a shoppingList by its documentID
 * In case of an Error it will return err, else it will return null, true
 */
var deleteShoppingList = function(id,done){
	model.shopping_List.findOne({_id: id}, function ( err, data) {
		if (err) return done(err);
		else {
			if (data != null)
				data.remove();
			return done(null, true);
		}
	})
};




/**
 *  Export all functions for the database
 */
module.exports = {
	createUser : createUser,
	getUser: getUser,
	getPasswordhash: getPasswordhash,
	deleteUser: deleteUser,
	createShoppingList: createShoppingList,
	deleteShoppingList:deleteShoppingList
}
