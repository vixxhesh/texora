const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// <<<<<<< pranav2
const authRoute = require("./router/authRoute");
const adminRoutes = require("./router/adminRoute");

// const userRoute = require('./router/userRoute');
const s3Routs = require('./router/awsS3Routes');
const userRoute = require("./router/userRoute");
// console.log(jdRoute);

const bodyParser = require("body-parser");

// const userRoute = require("./router/authRoute");
// const adminRoutes = require("./router/adminRoute");
const jdRoute = require("./router/jdRoute");
const meetingRoutes = require("./router/meetingRoutes");
const interviewVideoRoutes = require("./router/interviewVideos");
// console.log(interviewVideoRoutes)
// >>>>>>> main

// <<<<<<< raja
// createConnection()
//   .then(() => {
//     console.log("Connection successful to MongoDB");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async function createConnection() {
//   mongoose.connect(
//     "mongodb://127.0.0.1:27017/texora"
//   );
// }
// =======
const { connectDB } = require("./utils/db"); // Import connectDB function

const app = express();
const port = process.env.SERVER_PORT || 8080;

// Middleware
app.use(cors());
// <<<<<<< pranav2
// app.use("/app", authRoute);
// app.use("/admin", adminRoutes);
// app.use('/update',userRoute);
// app.listen(port, () => {
//   console.log(`server is running on port:${port}`);
// });
// =======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB and start the server
const startServer = async () => {
  await connectDB(); // Ensure connection is established

  //   app.use("/app", userRoute);
  app.use("/app", authRoute);
  app.use("/admin", adminRoutes);
  // app.use("/api/jd", jdRoute);
  app.use('/api/zoom',meetingRoutes);
  app.use('/api',s3Routs)
  app.use("/update", userRoute);
  // app.use("/api/jd", jdRoute);
  app.use("/api/zoom", meetingRoutes);
  app.use("/api/interview-videos", interviewVideoRoutes);
  // app.get("/api/interview-videos/download/:key", (req, res) => {
  //   const { key } = req.params;
  //   const filePath = path.join(__dirname, "interview-videos", key);

  //   if (fs.existsSync(filePath)) {
  //     res.download(filePath);
  //   } else {
  //     res.status(404).json({ error: "File not found" });
  //   }
  // });

  // app.delete("/api/interview-videos/delete/:key", (req, res) => {
  //   const { key } = req.params;
  //   const filePath = path.join(__dirname, "interview-videos", key);

  //   if (fs.existsSync(filePath)) {
  //     fs.unlinkSync(filePath);
  //     res.status(200).json({ message: "File deleted successfully." });
  //   } else {
  //     res.status(404).json({ error: "File not found" });
  //   }
  // });

  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
};

startServer();
// >>>>>>> main
