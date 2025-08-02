import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGO_URI}/${DATABASE_NAME}`);
        console.log(`✅ MongoDB connected to database: ${DATABASE_NAME}`);
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;
