const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../utils/awsConfig");

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

  try {
    const uploadPromises = files.map(async (file) => {
      const fileKey = `${rootFolder}/${profileName}/${file.originalname}`;

      const uploadParams = new PutObjectCommand({
        Bucket: "texora",
        Key: fileKey,
        Body: file.buffer,
      });

      const result = await s3Client.send(uploadParams);
      return {
        fileName: file.originalname,
        result: {
          Location: `https://texora.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
          Key: fileKey,
          Bucket: "texora",
        },
      };
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
  const params = new ListObjectsV2Command({
    Bucket: "texora",
    Prefix: "Resume/",
    Delimiter: "/", // Ensures we get subfolders
  });

  try {
    const data = await s3Client.send(params);
    // Check if CommonPrefixes exists before mapping
    const subfolders = data.CommonPrefixes
      ? data.CommonPrefixes.map((prefix) =>
          prefix.Prefix.replace("Resume/", "").replace("/", "")
        )
      : [];

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

  const params = new ListObjectsV2Command({
    Bucket: "texora",
    Prefix: `Resume/${subfolder}/`,
  });

  try {
    const data = await s3Client.send(params);
    // Check if Contents exists before mapping
    const files = data.Contents
      ? data.Contents.map((item) =>
          item.Key.replace(`Resume/${subfolder}/`, "")
        )
      : [];

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

  const command = new GetObjectCommand({
    Bucket: "texora",
    Key: fileKey,
  });

  try {
    // URL valid for 60 seconds
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    res.json({ url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).send("Error generating download URL");
  }
};

const listObjectsRecursively = async (Bucket) => {
  let allKeys = [];
  let ContinuationToken = undefined;

  do {
    const params = new ListObjectsV2Command({
      Bucket,
      ContinuationToken,
    });

    try {
      const data = await s3Client.send(params);
      if (data.Contents) {
        allKeys = allKeys.concat(data.Contents.map((item) => item.Key));
      }
      ContinuationToken = data.NextContinuationToken; // Check if more objects exist
    } catch (error) {
      console.error("Error fetching objects:", error);
      throw error;
    }
  } while (ContinuationToken);

  return allKeys;
};
