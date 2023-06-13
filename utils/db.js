const { MongoClient } = require('mongodb');

let dbClient;

const connectionString = process.env.ATLAS_URI || "mongodb+srv://josepinodeveloper001:64bdb66a@itrakdb.r6ae7lk.mongodb.net/";

const dbName = 'itrakdb';
// Connect to the MongoDB server and return the database client
const connect = async () => {
    try {
        if (!dbClient) {
            const url = connectionString;


            dbClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

            await dbClient.connect();
            console.log('Connected to MongoDB');
        }

        return dbClient.db(dbName);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
};

// Close the MongoDB connection
const close = () => {
    if (dbClient) {
        dbClient.close();
        console.log('MongoDB connection closed');
    }
};

module.exports = { connect, close };