import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbconnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\ndatabase is connected!! `);
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default dbconnect;
