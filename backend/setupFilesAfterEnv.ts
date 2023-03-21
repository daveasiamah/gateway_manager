import mongoose from "mongoose";
import connectDB from "./service/db";

global.afterAll(async () => {
  mongoose.connection.close();
});
