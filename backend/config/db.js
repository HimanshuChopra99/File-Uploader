const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDb connected successfully")
    } catch(err) {
        console.log("MongoDb connection failed", err.message)
    }
}

module.exports = connectDB;