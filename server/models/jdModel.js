// models/jdModel.js

const mongoose = require("mongoose");
require("dotenv").config();

// Initialize GridFSBucket once the connection is open
let gfsBucket;

// Wait for mongoose connection to be open before initializing GridFSBucket
mongoose.connection.once("open", () => {
  // Creating GridFSBucket instance
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "jduploads", // Define the name of the bucket where files will be stored
  });
  console.log("GridFS bucket initialized successfully.", gfsBucket);
});

// Export the gfsBucket for use in other parts of the application
module.exports = { gfsBucket };
