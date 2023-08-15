const mongoose = require('mongoose');
const {dbHost, dbPass, dbName, dbPort, dbUser} = require('../app/config');
mongoose.set("strictQuery", false);
try {
    // mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
    mongoose.connect(`mongodb+srv://adityayafi:48wQ8aCUa2cpFuQQ@cluster0.0n0vm3g.mongodb.net/?retryWrites=true&w=majority`);
    console.log("MongoDB Connection Success")
} catch (error) {
    console.log('Connection Failed', error.message)
}
const db = mongoose.connection;

module.exports = db;