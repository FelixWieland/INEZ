
/**
 *  Establish the connection to the mongoDb via mongooseConnection module
 */
const mongoose = require('./mongooseConnection').mongoose;




let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {type: String, required: true, unique: true},
	password_hash: {type: String, required:true},
	shopping_lists: [{type: Schema.Types.ObjectId, ref: 'shopping_List'}]
});
userSchema.index({name: 'text'});

const user = mongoose.model('user', userSchema);

let shoppingListSchema = new Schema({
	list_name: {type: String, required: true},
	products: [{_id: {type:Schema.Types.ObjectId, ref: 'products', required:true},
							measure: String,
							amount: {type: Number, min: 0}
							}]
});

const shopping_List = mongoose.model('shopping_List', shoppingListSchema);


let productsSchema = new Schema({
	name: {type: String, required: true},
	measure: {type: String, required:true}
});
productsSchema.index({name: 'text'});

const products = mongoose.model('products', productsSchema);


let productgroupsSchema = new Schema({
	groupname: {type: String, required: true}

});
productgroupsSchema.index({groupname: 'text' });

const productgroups = mongoose.model('productgroups', productgroupsSchema);
module.exports = {
	user:  user ,
	shopping_List: shopping_List,
	products: products,
	productgroups: productgroups
};

