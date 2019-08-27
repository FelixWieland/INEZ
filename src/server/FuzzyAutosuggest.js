import Fuse from "fuse.js"
import mongodb from "mongodb"

class FuzzyAutosuggest {

    constructor(connectionString) {
        this.options = {}
        this.dataset = []
        this.fuse = undefined
        this.loading = false
        this.connectionString = connectionString
        this.setOptions()
    }

    loadDataset(ready) {
        var MongoClient = mongodb.MongoClient
        this.loading = true
        MongoClient.connect(this.connectionString, { useNewUrlParser: true }, function (err, conn) {
            if (err) {
                throw err
            }
            var db = conn.db("INEZ")
            db.collection("products").find({}).toArray(function (err, result) {
                if (err) throw err
                ready(result)
            })
        })
    }

    setOptions() {
        this.options = {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 6,
            maxPatternLength: 20,
            keys: ['name']
        };
    }

    initializeFuse(dataset) {
        this.fuse = new Fuse(dataset, this.options)
        return this.fuse
    }

    runSearch(toSeachFor, respond, limit) {
        if (this.loading === true) throw "Currently loading"
        var that = this;
        if (this.fuse === undefined) {
            this.loadDataset(function (result) {
                var fuse = that.initializeFuse(result)
                that.loading = false
                if (limit === undefined) {
                    respond(fuse.search(toSeachFor))
                }
                else {
                    respond(fuse.search(toSeachFor).slice(0, limit))
                }
            })
            return
        }
        if (limit === undefined) {
            respond(this.fuse.search(toSeachFor))
        }
        else {
            respond(this.fuse.search(toSeachFor).slice(0, limit))
        }
    }
}

export default FuzzyAutosuggest