/**
 *  Get the required credential data.
 */
const fs = require('fs');

// const rawdata = fs.readFileSync('credentials.json');
// const credentials = JSON.parse(rawdata);
const MONGO_URI = 'mongodb+srv://inez_user:inez_user@cluster0-p8frj.mongodb.net/INEZ?retryWrites=true&w=majority';
/**
 *  Establish the connection to the mongoDb via mongoose
 */
const mongoose = require('mongoose');
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
/**
 *  Export the connection
 */


module.exports = {
	mongoose: mongoose
};
