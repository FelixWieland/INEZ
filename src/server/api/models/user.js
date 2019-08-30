const mongoose = require("../confic/mongooseConnection").mongoose;

const userSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	password_hash: { type: String, required: true },
	shopping_lists: [{ type: Schema.Types.ObjectId, ref: "shopping_List" }]
});
userSchema.index({ name: "text" });

module.exports = mongoose.model("user", userSchema);
