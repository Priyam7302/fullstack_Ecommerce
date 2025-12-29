import mongoose from 'mongoose';
import "dotenv/config";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Error connecting to database:", error);
    }
}
export default connectToDB;