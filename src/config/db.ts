import mongoose from "mongoose";
import "dotenv/config";

const connection = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database got connected");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
