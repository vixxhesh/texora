// const s3 = require("../utils/s3");
// const winston = require("winston");

// const BUCKET_NAME = process.env.S3_BUCKET_NAME || "texora";
// const FOLDER_NAME = "JD";
// const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // Allowed file types

// // Helper function to validate the key
// const isValidKey = (key) => /^[a-zA-Z0-9._/-]+$/.test(key);

// // **Upload JD**
// exports.uploadJD = async (req, res) => {
//   const { name } = req.body;

//   if (!req.file || !name) {
//     return res.status(400).json({ message: "JD file and name are required." });
//   }

//   if (!allowedMimeTypes.includes(req.file.mimetype)) {
//     return res.status(400).json({ message: "Invalid file type. Only PDF, DOC, and DOCX are allowed." });
//   }

//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: `${FOLDER_NAME}/${name}-${Date.now()}`,
//     Body: req.file.buffer,
//     ContentType: req.file.mimetype,
//   };

//   try {
//     await s3.upload(params).promise();
//     res.status(200).json({ message: "JD uploaded successfully." });
//   } catch (error) {
//     winston.error("S3 Upload Error:", { error, params });
//     res.status(500).json({ message: "Failed to upload JD." });
//   }
// };

// // **List all JDs in S3**
// exports.listJDs = async (req, res) => {
//   try {
//     const params = { Bucket: BUCKET_NAME, Prefix: `${FOLDER_NAME}/` };
//     const data = await s3.listObjectsV2(params).promise();

//     const jds = data.Contents.map((item) => ({
//       key: item.Key,
//       name: item.Key.replace(`${FOLDER_NAME}/`, ""),
//       lastModified: item.LastModified,
//       size: item.Size,
//     }));

//     res.status(200).json(jds);
//   } catch (error) {
//     winston.error("S3 List Error:", { error });
//     res.status(500).json({ message: "Failed to fetch JD list." });
//   }
// };

// // **Download JD**
// exports.downloadJD = async (req, res) => {
//   const { key } = req.params;

//   if (!key || !isValidKey(key)) {
//     return res.status(400).json({ message: "Valid JD key is required." });
//   }

//   const params = { Bucket: BUCKET_NAME, Key: `${FOLDER_NAME}/${key}` };

//   try {
//     const stream = s3.getObject(params).createReadStream();

//     res.setHeader("Content-Type", "application/octet-stream");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${key.replace(`${FOLDER_NAME}/`, "")}"`
//     );

//     stream.pipe(res).on("error", (error) => {
//       winston.error("S3 Stream Error:", { error, key });
//       res.status(500).json({ message: "Failed to download JD." });
//     });
//   } catch (error) {
//     winston.error("S3 Download Error:", { error, key });
//     if (error.code === "NoSuchKey") {
//       return res.status(404).json({ message: "JD not found." });
//     }
//     res.status(500).json({ message: "Failed to download JD." });
//   }
// };

// // **Delete JD**
// exports.deleteJD = async (req, res) => {
//   const { key } = req.params;

//   if (!key || !isValidKey(key)) {
//     return res.status(400).json({ message: "Valid JD key is required." });
//   }

//   const params = { Bucket: BUCKET_NAME, Key: `${FOLDER_NAME}/${key}` };

//   try {
//     await s3.deleteObject(params).promise();
//     res.status(200).json({ message: "JD deleted successfully." });
//   } catch (error) {
//     winston.error("S3 Delete Error:", { error, key });
//     if (error.code === "NoSuchKey") {
//       return res.status(404).json({ message: "JD not found." });
//     }
//     res.status(500).json({ message: "Failed to delete JD." });
//   }
// };
