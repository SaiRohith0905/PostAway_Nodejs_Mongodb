import mongoose from "mongoose";

async function connectToMongoDBUsingMongoose() {
  try {
    await mongoose.connect("mongodb://localhost:27017/postAwayDB");
    console.log("Successfully connected to mongodb using mongoose");
  } catch (err) {
    console.log(err);
  }
}

export default connectToMongoDBUsingMongoose;
