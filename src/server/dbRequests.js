/**
 *  Include all Models
 */
const model = require("./config/dbModels.js");
const mongoose = require("./config/mongooseConnection").mongoose;

// /**
//  *  create a user, gives back the user in case of success and a err in case of a failure
//  */
const createUser = (name, password_hash, done) => {
	const user = new model.user({ name: name, password_hash: password_hash });
	user.save((err, data) => {
		if (err) {
			return done(err);
		}
		return done(null, data);
	});
};

// /**
//  *  Get a user by name without hash
//  *  returns null or the user
//  */
const getUser = (name, done) => {
	model.user.findOne({ name: name }, (err, data) => {
		if (err) {
			return done(null);
		} else if (data == undefined) return done(null);
		data.password_hash = null;
		return done(null, data);
	});
};

// /**
//  *  Get a passwordhash from user by name
//  *  returns null or the userpassword
//  */
const getPasswordhash = (name, done) => {
	model.user.findOne({ name: name }, (err, data) => {
		if (err) return done(err);
		return done(null, data.password_hash);
	});
};

// /**
//  * Delete a user by name
//  * return is a error a true
//  */
const deleteUser = (name, done) => {
	model.user.findOne({ name: name }, (err, data) => {
		if (err) return done(err);
		else {
			if (data != null) {
				data.shopping_lists.forEach(element => {
					model.shopping_List.findOne(
						{ _id: mongoose.Types.ObjectId(element) },
						(err, data2) => {
							if (err) return done(err);
							else {
								if (data2 != undefined) {
									data2.remove();
								}
								return done(null, true);
							}
						}
					);
				});
				data.remove();
			}

			return done(null, true);
		}
	});
};

// createShoppingList
//  this function will return the JSON of a shoppingList or a Error
const createShoppingList = (userName, listname, done) => {
	const shoppingList = new model.shopping_List({ list_name: listname });
	shoppingList.save((err, listData) => {
		if (err) {
			return done(err);
		} else {
			model.user.findOne({ name: userName }, (err, data) => {
				if (err) {
					shoppingList.remove();

					return done(err);
				}
				if (data == undefined) {
					shoppingList.remove();
					return done("error");
				} else {
					if (data != null) {
						data.shopping_lists.push(mongoose.Types.ObjectId(listData._id));
						data.save();
					} else {
						listData.remove();
						return done("Error, user did not exist");
					}

					return done(null, listData);
				}
			});
		}
	});
};

// /**
//  * DeleteShoppingList
//  * this function will delete a shoppingList by its documentID
//  * In case of an Error it will return err, else it will return null, true
//  */
const deleteShoppingList = (username, id, done) => {
	model.user.findOne({ name: username }, (err, data) => {
		if (err) return done(err);
		else {
			if (data == undefined) return done(null, true);
			for (let i = data.shopping_lists.length - 1; i >= 0; i--) {
				if (data.shopping_lists[i].equals(id)) {
					data.shopping_lists.splice(i, 1);

					data.save;
				}
			}

			data.save();
			return done(null, true);
			/*
			model.shopping_List.findOne({_id: mongoose.Types.ObjectId(id)}, function ( err, data) {
				if (err) return done(err);
				else {
					if (data != undefined)
						data.remove();
					return done(null, true);
				}
			});*/
		}
	});
};

// /**
//  *  Get Shopping Lists by Name
//  *  Returns a Array JSON of the ShoppingLists. In Case of an error the return will be an error
//  */
const getShoppingLists = (username, done) => {
	model.user.findOne({ name: username }, (err, data) => {
		if (err) return done(err);
		if (data == null) {
			return done(new Error("user not Found"));
		} else {
			model.shopping_List.find({ _id: data.shopping_lists }, (err, data2) => {
				if (err) return done(err);
				return done(null, data2);
			});
		}
	});
};

// /**
//  * Get Shopping List by Id
//  * Return JSON With a shoppingList;
//  */
const getShoppingListsById = (id, done) => {
	model.shopping_List.findOne({ _id: id }, (err, data) => {
		if (err) return done(err);
		else {
			if (data == null) {
				return done(false);
			}
			return done(null, data);
		}
	});
};

// /**
//  *  Add Product to a shopping List by the ID of the ShoppingList
//  *  Required Parameters: ShoppingListID, ProductID, Measure, Amount
//  *  In Case of an Error it will return an error, else it will return the ShoppingList as JSON
//  */
const addProductToShoppingList = (
	shoppingListId,
	groupname,
	productId,
	name,
	measure,
	amount,
	checked,
	done
) => {
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return err;
			if (data == null) {
				return done("error ShoppingList not found");
			}
			for (const key in data.productgroups) {
				if (data.productgroups[key].group !== groupname) {
					continue;
				}
				for (let i = 0; i < data.productgroups[key].products.length; i++) {
					if (
						data.productgroups[key].products[i]._id.equals(
							mongoose.Types.ObjectId(productId)
						)
					) {
						return done(
							new Error("This Product is already in the shoppingList")
						);
					}
				}
				console.log(name);
				data.productgroups[key].products.push({
					_id: mongoose.Types.ObjectId(productId),
					name: name,
					measure: measure,
					amount: amount,
					checked: checked
				});
			}

			data.save();
			return done(null, data);
		}
	);
};

// /**
//  * Remove a Product by its ID from a shoppinglist (ID must be provided)
//  */
const removeProductFromShoppingList = (
	shoppingListId,
	groupname,
	productId,
	done
) => {
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return done(err);
			else {
				if (data == undefined) return done(false);
				for (const key in data.productgroups) {
					if (data.productgroups[key].group !== groupname) {
						continue;
					}
					for (
						let i = data.productgroups[key].products.length - 1;
						i >= 0;
						i--
					) {
						if (data.productgroups[key].products[i].equals(productId)) {
							data.productgroups[key].products.splice(i, 1);
							data.save();
						}
					}
				}
				data.save();
				return done(null, true);
			}
		}
	);
};

// /**
//  * Change Amount of a Product in a ShoppingList
//  */
const changeProductAmountInShooppingList = (
	shoppingListId,
	productId,
	newAmount,
	done
) => {
	model.shopping_List.findOne({ _id: shoppingListId }, (err, data) => {
		if (err) return done(err);
		for (let i = 0; i < data.products.length; i++) {
			if (data.products[i]._id.equals(mongoose.Types.ObjectId(productId))) {
				data.products[i].amount = newAmount;
				data.save();
				return done(null, data);
			}
		}
	});
};
// /**
//  * Change Group of a Product in a ShoppingList
//  */
const changeProductGroupInShooppingList = (
	shoppingListId,
	productId,
	newGroup,
	done
) => {
	model.shopping_List.findOne({ _id: shoppingListId }, (err, data) => {
		if (err) return done(err);
		for (let i = 0; i < data.products.length; i++) {
			if (data.products[i]._id.equals(mongoose.Types.ObjectId(productId))) {
				data.products[i].group = newGroup;
				data.save();
				return done(null, data);
			}
		}
	});
};

// /**
//  * Change Measure of a Product in a ShoppingList
//  */
const changeProductMeasureInShooppingList = (
	shoppingListId,
	productId,
	newMeasure,
	done
) => {
	model.shopping_List.findOne({ _id: shoppingListId }, (err, data) => {
		if (err) return done(err);
		for (let i = 0; i < data.products.length; i++) {
			if (data.products[i]._id.equals(mongoose.Types.ObjectId(productId))) {
				data.products[i].measure = newMeasure;
				data.save();
				return done(null, data);
			}
		}
	});
};

// /**
//  *Get a list of all Products
//  */
let allProducts;
const getAllProducts = done => {
	if (allProducts == undefined) {
		model.products
			.find({}, (err, data) => {
				if (err) return done(err);
				allProducts = data;
				done(null, data);
			})
			.select({ name: 1 });
	} else {
		return done(null, allProducts);
	}
};

/*
const minutes_prd = 10; const the_interval_prd = minutes_prd * 60 * 1000
// const interval = function(){
setInterval(() => {
	console.log('I am doing my 10 minutes check and update allProductsvariable')
	// do your stuff here

	model.products.find({}, (err, data) => {
		if (err) return console.log(err)
		allProducts = data
		console.log('allProducts updated')
	}).select({ 'name': 1 })
}, the_interval_prd)
*/

// /**
//  * Get a List of all Products which are in the group of the provided ID
//  */
const getAllProductsByGroupId = (productGroupId, done) => {
	model.products.find(
		{ productgroupid: mongoose.Types.ObjectId("5d625be7bb9fb093bf5fa4f0") },
		(err, data) => {
			if (err) return done(err);
			return done(null, data);
		}
	);
};

// /**
//  * Get a List of all ProductGroups
//  */
const getAllProductGroups = done => {
	model.productgroups.find({}, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

// /**
//  *  Function to remove unused shoppingLists
//  */
const removeUnusedShoppingLists = done => {
	model.shopping_List.find({}, (err, data) => {
		data.forEach(element => {
			model.user.findOne(
				{ shopping_lists: mongoose.Types.ObjectId(element._id) },
				(err, data2) => {
					if (err) return done(err);
					if (data2 == undefined) {
						element.remove();
					}
				}
			);
		});
	});
	done(null, "done");
};

// createShoppingListGroup
const createShoppingListGroup = (shoppingListId, groupname, done) => {
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return err;
			if (data == null) {
				return done("error ShoppingList not found");
			}

			data.productgroups.push({
				group: groupname,
				group: groupname,
				products: []
			});

			data.save();
			return done(null, data);
		}
	);
};

const deleteShoppingListGroup = (shoppingListId, groupname, done) => {
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return err;
			if (data == null) {
				return done("error ShoppingList not found");
			}

			for (let i = 0; i < data.productgroups.length; i++) {
				if (data.productgroups[i].group == groupname) {
					data.productgroups.splice(i, 1);
				}
			}
			data.save();
			return done(null, "deleted " + groupname);
		}
	);
};

const getAllItemsInShoppingList = (shoppingListId, done) => {
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return err;
			if (data == null) {
				return done("error ShoppingList not found");
			}

			return done(null, data);
		}
	);
};

const updateProductInGroup = (shoppingListId, groupname, updateObj, done) => {
	console.log("test4");
	model.shopping_List.findOne(
		{ _id: mongoose.Types.ObjectId(shoppingListId) },
		(err, data) => {
			if (err) return err;
			if (data == null) {
				return done("error ShoppingList not found");
			}

			for (let key in data.productgroups) {
				if (data.productgroups[key].group !== groupname) {
					continue;
				}

				// eslint-disable-next-line guard-for-in
				for (let iKey in data.productgroups[key].products) {
					if (!data.productgroups[key].products[iKey]._id) continue;
					if (
						data.productgroups[key].products[iKey]._id.equals(
							mongoose.Types.ObjectId(updateObj._id)
						)
					) {
						data.productgroups[key].products[iKey] = updateObj;
						data.save();
						return done(null, data.productgroups[key].products[iKey]);
					}
				}
			}
		}
	);
};

// /**
//  * sets a intervall to remove all unused Shopping Lists every 10 minutes
//  */
const minutes_remShoppingLists = 5;
const the_interval_remShoppingLists = minutes_remShoppingLists * 60 * 1000;
setInterval(() => {
	console.log(
		"I am doing my 5 minutes check and delete all unused Shopping Lists"
	);
	// do your stuff here
	removeUnusedShoppingLists((err, data) => {
		if (err) console.log(err);
		else console.log(data);
	});
}, the_interval_remShoppingLists);

/**
 *  Export all functions for the database
 */

module.exports = {
	createUser,
	getUser,
	getPasswordhash,
	deleteUser,
	createShoppingList,
	deleteShoppingList,
	getShoppingLists,
	addProductToShoppingList,
	getAllProducts,
	getShoppingListsById,
	getAllProductsByGroupId,
	getAllProductGroups,
	removeProductFromShoppingList,
	changeProductAmountInShooppingList,
	changeProductMeasureInShooppingList,
	changeProductGroupInShooppingList,
	createShoppingListGroup,
	deleteShoppingListGroup,
	getAllItemsInShoppingList,
	updateProductInGroup
};
