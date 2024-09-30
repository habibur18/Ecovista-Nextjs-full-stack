"server only";
import mongoose from "mongoose";
export async function dbConnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log(`MongoDB Connected: ${connection.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}
