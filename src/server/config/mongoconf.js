import { MongoClient } from 'mongodb';

// Connect to the db
export const connect = async () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect("mongodb://localhost:27017", (err, db) => {
            if (err) reject(err);
            resolve(db.db("Symblexity"));
        });
    });
}

export const requestDBPassGenerator = (db) => ((req, resp, route) => { })