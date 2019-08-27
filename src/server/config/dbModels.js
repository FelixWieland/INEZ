
/**
 *  Establish the connection to the mongoDb via mongooseConnection module
 */
var mongoose = require('./mongooseConnection').mongoose




var Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {type: String, required: true, unique: true},
	password_hash: {type: String, required:true},
	shopping_lists: [{type: Schema.Types.ObjectId, ref: 'shopping_List'}]
});
userSchema.index({name: 'text'})

let user = mongoose.model('user', userSchema);

let shoppingListSchema = new Schema({
	list_name: {type: String, required: true},
	products: [{product_name: {type:Schema.Types.ObjectId, ref: 'products'},
							measure: String,
							amount: {type: Number, min: 0 }
							}]
});

let shopping_List = mongoose.model('shopping_List', shoppingListSchema);


let productsSchema = new Schema({
	name: {type: String, required: true},
	measure: {type: String, required:true}
});
productsSchema.index({name: 'text'});

let products = mongoose.model('products', productsSchema);


let productgroupsSchema = new Schema({
	groupname: {type: String, required: true}

});
productgroupsSchema.index({groupname: 'text' });

let productgroups = mongoose.model('productgroups', productgroupsSchema);
module.exports = {
	user:  user ,
	shopping_List: shopping_List,
	products: products,
	productgroups: productgroups
};
