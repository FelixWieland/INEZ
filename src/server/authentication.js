const bcrypt = require("bcrypt");
const saltRounds = "FFF12345678";
const myPlaintextPassword = "s0//P4$$w0rD"; // comes in after post request
const someOtherPlaintextPassword = "not_bacon"; // comparisin value from dbquery

//salt and hash
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
});

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
	// res == true
});

//authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email }).exec(function(err, user) {
		if (err) {
			return callback(err);
		} else if (!user) {
			var err = new Error("User not found.");
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if (result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};
