const express = require('express');
const router = express.Router();
const {uploadS3,getFolder,downloadFile,subFolder} = require('../controllers/awsS3controller')
const multer = require('multer');


const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only PDF and Word files are allowed!"), false); // Reject file
    }
  };
  
  const upload = multer({ storage, fileFilter });

// routes of Handling Request
router.post('/upload',upload.array('files',10),uploadS3);
router.get("/files",getFolder);
router.get("/download",downloadFile);
router.get("/subfolders",subFolder);

module.exports = router;