const mongoose = require("./mongooseConnection").mongoose;

const shoppingListSchema = mongoose.Schema({
	list_name: { type: String, required: true },
	_id: mongoose.Schema.Types.ObjectId,
	products: [
		{
			_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
			measure: String,
			amount: { type: Number, min: 0 },
			group: { type: String, required: true }
		}
	]
});

module.exports = mongoose.model("shopping_List", shoppingListSchema);
