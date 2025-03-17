const s3 = require("../utils/awsConfig"); // I

// Route for uploading files
exports.uploadS3 = async (req, res) => {
  const { profileName } = req.body;
  console.log(profileName);
  const files = req.files;
  const rootFolder = "Resume";
  if (!profileName || !files) {
    return res
      .status(400)
      .json({ error: "Profile name and file are required" });
  }

  // const fileName = `${profileName}/${files.originalname}`; // File path in S3

  try {
    const uploadPromises = files.map(async (file) => {
      const fileKey = `${rootFolder}/${profileName}/${file.originalname}`;
      const uploadParams = {
        Bucket: "texora",
        Key: fileKey,
        Body: file.buffer,
      };

      const result = await s3.upload(uploadParams).promise();
      return { fileName: file.originalname, result };
    });
    const uploadResults = await Promise.all(uploadPromises);
    res
      .status(200)
      .json({ message: "File uploaded successfully!", files: uploadResults });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
exports.subFolder = async (req, res) => {
  const params = {
    Bucket: "texora",
    Prefix: "Resume/",
    Delimiter: "/", // Ensures we get subfolders
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const subfolders = data.CommonPrefixes.map((prefix) =>
      prefix.Prefix.replace("Resume/", "").replace("/", "")
    );
    res.json({ subfolders });
  } catch (error) {
    console.error("Error fetching subfolders:", error);
    res.status(500).send("Error fetching subfolders");
  }
};

// Endpoint to list files in a specific subfolder
exports.getFolder = async (req, res) => {
  const { subfolder } = req.query;

  if (!subfolder) {
    return res.status(400).send("Subfolder is required");
  }

  const params = {
    Bucket: "texora",
    Prefix: `Resume/${subfolder}/`,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map((item) =>
      item.Key.replace(`Resume/${subfolder}/`, "")
    );
    res.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Error fetching files");
  }
};

// Endpoint to generate a signed URL for downloading files
exports.downloadFile = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).send("File key is required");
  }

  const params = {
    Bucket: "texora",
    Key: fileKey,
    Expires: 60, // URL valid for 60 seconds
  };

  try {
    const url = await s3.getSignedUrlPromise("getObject", params);
    res.json({ url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).send("Error generating download URL");
  }
};
// const listObjects = async (Bucket, Prefix = "") => {
//   const params = {
//     Bucket,
//     Prefix,
//   };
//   console.log("S3 Parameters:", params);
//   const data = await s3.listObjectsV2(params).promise();
//   console.log(data);
//   return data.Contents.map((item) => item.Key);
// };
const listObjectsRecursively = async (Bucket) => {
  let allKeys = [];
  let ContinuationToken = null;

  do {
    const params = {
      Bucket,
      ContinuationToken,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      allKeys = allKeys.concat(data.Contents.map((item) => item.Key));
      ContinuationToken = data.NextContinuationToken; // Check if more objects exist
    } catch (error) {
      console.error("Error fetching objects:", error);
      throw error;
    }
  } while (ContinuationToken);

  return allKeys;
};

// Call the function
// const files = listObjectsRecursively("texora", "resume/");
// console.log("Files:", files);

// Route to fetch all folders and files
// exports.getFolder = (async (req, res) => {
//   try {
//     const bucketName = "texora"; // Your bucket name
//     const folderPath = "resume/"; // Root folder path

//     const files = await listObjectsRecursively(bucketName, folderPath);
//     res.json({ files });
//     console.log(files);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching files");
//   }
// });

// // Route to download a file
// exports.downloadFile =(async (req, res) => {
//   try {
//     const bucketName = "texora"
//     const fileKey = req.query.key; // Get the file key from query params

//     const params = {
//       Bucket: bucketName,
//       Key: fileKey,
//     };

//     const fileStream = s3.getObject(params).createReadStream();
//     res.attachment(fileKey);
//     fileStream.pipe(res);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error downloading file");
//   }
// });
