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
var mongoose = require('mongoose');
mongoose.connect(MONGO_URI,{ useNewUrlParser: true});
/**
 *  Export the connection
 */
module.exports = {
	mongoose:  mongoose
};
