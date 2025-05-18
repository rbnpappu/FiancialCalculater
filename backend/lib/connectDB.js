const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async()=>{
    try{
        if(cached.conn){
            return cached.conn;
        }

        if(!cached.promise){
            cached.promise = mongoose.connect(MONGODB_URI).then((mongoose)=>{
                return mongoose
            }
            )
        }

    }catch(error){
        throw new Error('Failed to connect to MongoDB');
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = connectDB;
