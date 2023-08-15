const mongoose = require('mongoose');
const {dbHost, dbPass, dbName, dbPort, dbUser} = require('../app/config');
mongoose.set("strictQuery", false);
try {
    mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
    console.log("MongoDB Connection Success")
} catch (error) {
    console.log('Connection Failed', error.message)
}
const db = mongoose.connection;

module.exports = db;