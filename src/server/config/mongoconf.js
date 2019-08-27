import { MongoClient } from 'mongodb';

// Connect to the db
export const connect = async (connectionString, database) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, db) => {
            if (err) reject(err);
            resolve(db.db(database));
        });
    });
}

export const requestDBPassGenerator = (db) => ((req, resp, route) => { })