const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;


const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    }catch(error){
        throw new Error('Failed to connect to MongoDB');
    }
}

module.exports = connectDB;