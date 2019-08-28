/**
 *  Include all Models
 */
var model = require("./config/dbModels.js");
const mongoose = require("./config/mongooseConnection").mongoose;

/**
 *  create a user, gives back a null for success and a err in case of a failure
 */
let createUser = function(name, password_hash, done){
	let user = new model.user({name: name, password_hash : password_hash});
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
let getUser = function (name, done){
	model.user.findOne({name: name}, function(err, data){
		if(err)
			return done(null);
		else
			if (data==undefined) return done(null);
			data.password_hash=null;
		return done(null, data);
	});
}

/**
 *  Get a passwordhash from user by name
 *  returns null or the userpassword
 */
let getPasswordhash = function (name,done){
	model.user.findOne({name : name},function (err, data) {
		if (err) return done(err);
		return done(null, data.password_hash);
	});
}

/**
 * Delete a user by name
 * return is a error a true
 */
let deleteUser = function(name,done){
	model.user.findOne({name: name}, function ( err, data) {
		if (err) return done (err);
		else{
			if(data!=null){
				data.shopping_lists.forEach(function(element){
					model.shopping_List.findOne({_id: mongoose.Types.ObjectId(element)}, function ( err, data2) {
						if (err) return done(err);
						else {
							if (data2 != undefined)
								data2.remove();
							return done(null, true);
						}
					})
				});
				data.remove();

			}

			return done(null, true);
		}
	})
}

/** createShoppingList
 *  this function will return the JSON of a shoppingList or a Error
 */
let createShoppingList = function(userName, listname , done){
		let shoppingList= new model.shopping_List({list_name: listname});
		shoppingList.save(function(err, listData){
			if (err)
				return done(err);
			else{
				model.user.findOne({name: userName}, function ( err, data) {
					if (err) {
						shoppingList.remove();

						return done (err);
					};
					if(data==undefined)   {
						shoppingList.remove();
						return done("error");
					}
					else{
						if(data!=null){
							data.shopping_lists.push(mongoose.Types.ObjectId(listData._id));
							data.save();
						}
						else {
							listData.remove();
							return done("Error, user did not exist")
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
let deleteShoppingList = function(username, id ,done){
	model.user.findOne({name: username}, function(err, data){
		if (err) return done(err);
		else{
			if (data==undefined) return done(false);
			for(let i=data.shopping_lists.length-1; i>=0;i--){
				if (data.shopping_lists[i].equals(id) ){
					data.shopping_lists.splice(i,1);

					data.save;
				}
			}

			data.save();
			model.shopping_List.findOne({_id: mongoose.Types.ObjectId(id)}, function ( err, data) {
				if (err) return done(err);
				else {
					if (data != undefined)
						data.remove();
					return done(null, true);
				}
			});
		}
	});
};

/**
 *  Get Shopping Lists by Name
 *  Returns a Array JSON of the ShoppingLists. In Case of an error the return will be an error
 */
let getShoppingLists = function(username, done){
	model.user.findOne({name: username}, function(err, data){
		if (err) return done(err);
		if (data==null){
			return done(new Error("user not Found"))
		}
		else{

				model.shopping_List.find({_id: data.shopping_lists}, function (err, data2) {
					if (err) return done(err);
					return done(null, data2);
				});
			}



	});

}

/**
 * Get Shopping List by Id
 * Return JSON With a shoppingList;
 */
let getShoppingListsById = function(id, done){
	model.shopping_List.findOne({_id: id}, function(err, data){
		if (err) return done(err);
		else{
			if (data==null)
				return done(false);
			return done(null, data);
		}
	});
};



/**
 *  Add Product to a shopping List by the ID of the ShoppingList
 *  Required Parameters: ShoppingListID, ProductID, Measure, Amount
 *  In Case of an Error it will return an error, else it will return the ShoppingList as JSON
 */
let addProductToShoppingList = function(shoppingListId, productId, measure, amount, done){
	model.shopping_List.findOne({_id: mongoose.Types.ObjectId(shoppingListId)}, function (err, data) {
		if(err) return err;
		if(data==null){
			return done("error ShoppingList not found");
		}
		try {
			data.products.push({productId: mongoose.Types.ObjectId(productId), measure: measure, amount : amount});
		}
		catch (e) {
			return done(e);
		}
		data.save();
		return done(null, data);
	});
}

/**
 * Remove a Product by its ID from a shoppinglist (ID must be provided)
 */
let removeProductFromShoppingList = function(productId, shoppingListId, done){
	model.shopping_List.findOne({_id: mongoose.Types.ObjectId(shoppingListId)}, function(err, data) {
		if (err) return done(err);
		else {
			if (data == undefined) return done(false);
			for (let i = data.products.length - 1; i >= 0; i--) {
				if (data.products[i].equals(productId)) {
					data.products.splice(i, 1);

					data.save;
				}
			}

			data.save();
			return done(null, true);
		}
	});
}

/**
 *Get a list of all Products
 */
let getAllProducts = function(done){
	model.products.find({}, function(err, data) {
		if(err) return done(err);
		done (null, data)
	}).select({"name":1});
}

/**
 * Get a List of all Products which are in the group of the provided ID
 */
let getAllProductsByGroupId = function(productGroupId, done){
	model.products.find({productgroupid: mongoose.Types.ObjectId("5d625be7bb9fb093bf5fa4f0")}, function (err, data) {
		if (err) return done(err);
		return  done(null, data)
	});
}


/**
 * Get a List of all ProductGroups
 */
let getAllProductGroups = function(done){
	model.productgroups.find({}, function(err, data) {
		if(err) return done(err);
		done (null, data)
	});
}




/**
 *  Export all functions for the database
 */
module.exports = {
	createUser : createUser,
	getUser: getUser,
	getPasswordhash: getPasswordhash,
	deleteUser: deleteUser,
	createShoppingList: createShoppingList,
	deleteShoppingList:deleteShoppingList,
	getShoppingLists:getShoppingLists,
	addProductToShoppingList:addProductToShoppingList,
	getAllProducts: getAllProducts,
	getShoppingListsById:getShoppingListsById,
	getAllProductsByGroupId:getAllProductsByGroupId,
	getAllProductGroups:getAllProductGroups,
	removeProductFromShoppingList: removeProductFromShoppingList
};
