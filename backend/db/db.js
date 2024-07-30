import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db");
    } catch (error) {
        console.log("failed to db");
    }
}  

export default connectdb;