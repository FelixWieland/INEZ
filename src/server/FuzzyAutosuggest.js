import Fuse from 'fuse.js';
import mongodb from 'mongodb';

class FuzzyAutosuggest {
	constructor(connectionString) {
		this.options = {}
		this.dataset = []
		this.fuse = undefined
		this.loading = false
		this.connectionString = connectionString
		this.setOptions()
	}

	loadDataset = (ready) => {
		const MongoClient = mongodb.MongoClient
		this.loading = true
		MongoClient.connect(
			this.connectionString,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			(err, conn) => {
				if (err) {
					throw err
				}
				console.log("ok")
				const db = conn.db('INEZ')
				db.collection('products')
					.find({})
					.toArray((err, result) => {
						if (err) throw err
						ready(result)
					})
			}
		)
	};

	setOptions = () => {
		this.options = {
			shouldSort: true,
			threshold: 0.4,
			location: 0,
			distance: 6,
			maxPatternLength: 20,
			keys: ['name'],
		}
	};

	initializeFuse = (dataset) => {
		this.fuse = new Fuse(dataset, this.options)
		return this.fuse
	};

	runSearch = (toSeachFor, respond, limit) => {
		if (this.loading === true) throw new Error('Currently loading')
		if (this.fuse === undefined) {
			this.loadDataset((result) => {
				const fuse = this.initializeFuse(result)
				this.loading = false
				if (limit === undefined) {
					respond(fuse.search(toSeachFor))
					return;
				}
				respond(fuse.search(toSeachFor).slice(0, limit))
			})
			return;
		}
		if (limit === undefined) {
			respond(this.fuse.search(toSeachFor))
			return;
		}
		respond(this.fuse.search(toSeachFor).slice(0, limit))
	};
}

export default FuzzyAutosuggest
