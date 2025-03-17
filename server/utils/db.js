// utils/db.js
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
require("dotenv").config();

const mongouri =
  process.env.MONGO_URI ||
  "mongodb+srv://vishesh:tXrexK2agGY6Apcl@cluster0.ds1rv.mongodb.net/jd?retryWrites=true&w=majority&appName=Cluster0";

let gfsBucket = null;

const connectDB = async () => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connection established successfully");

    const db = mongoose.connection.db;
    gfsBucket = new GridFSBucket(db, {
      bucketName: "jduploads",
    });
    console.log("GridFS bucket initialized successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

const getGfsBucket = () => {
  if (!gfsBucket) {
    throw new Error(
      "GridFS bucket not initialized. Make sure MongoDB connection is established."
    );
  }
  return gfsBucket;
};

module.exports = { connectDB, getGfsBucket };
