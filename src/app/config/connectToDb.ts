import { config } from "./envConfiguration";
import mongoose from 'mongoose'
export const connectToDb = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("⚡ Already connected to MongoDB");
            return;
        }
        await mongoose.connect(config.dbConnection!);
        console.log("✅ MongoDB connected");
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });
        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected");
        });
    } catch (err) {
        console.error("❌ MongoDB connection failed:");
    }
};
