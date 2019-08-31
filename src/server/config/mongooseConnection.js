/**
 *  Get the required credential data.
 */
const fs = require('fs')

const rawdata = fs.readFileSync('./config/credentials.json')
const credentials = JSON.parse(rawdata)
const MONGO_URI = credentials.mongo.srv
/**
 *  Establish the connection to the mongoDb via mongoose
 */
const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
/**
 *  Export the connection
 */


module.exports = {
	mongoose: mongoose,
}
