import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const connectMongoDB = db => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Conectado a mongoDB Atlas');
            db()
        })
};

export default connectMongoDB;