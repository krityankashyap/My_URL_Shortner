import mongoose from "mongoose";
import { serverConfig } from ".";

export async function connectDB(){
  try {
    await mongoose.connect(serverConfig.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}