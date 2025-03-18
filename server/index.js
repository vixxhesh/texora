const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./router/authRoute");
const adminRoutes = require("./router/adminRoute");
const s3Routs = require("./router/awsS3Routes");
const userRoute = require("./router/userRoute");
const path = require("path");

const bodyParser = require("body-parser");

const jdRoute = require("./router/jdRoute");
const meetingRoutes = require("./router/meetingRoutes");
const interviewVideoRoutes = require("./router/interviewVideos");
const { connectDB } = require("./utils/db"); // Import connectDB function

const app = express();
const port = process.env.SERVER_PORT || 8080;
const _dirname = path.resolve();
const buildpath = path.join(_dirname, "../client/dist");
app.use(express.static(buildpath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://35.154.204.230",
    credentials: true,
  })
);
// Connect to MongoDB and start the server
const startServer = async () => {
  await connectDB(); // Ensure connection is established

  //   app.use("/app", userRoute);
  app.use("/app", authRoute);
  app.use("/admin", adminRoutes);
  // app.use("/api/jd", jdRoute);
  app.use("/api/zoom", meetingRoutes);
  app.use("/api", s3Routs);
  app.use("/update", userRoute);
  // app.use("/api/jd", jdRoute);
  app.use("/api/zoom", meetingRoutes);
  app.use("/api/interview-videos", interviewVideoRoutes);

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildpath, "index.html"));
  });
  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
};

startServer();
// >>>>>>> main
