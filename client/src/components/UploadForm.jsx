import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import S3Browser from "./S3Browser";
const UploadFile = () => {
  const [profileName, setProfileName] = useState("");
  const [file, setFile] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const invalidFiles = Array.from(file).filter(file => !allowedTypes.includes(file.type));

  if (invalidFiles.length > 0) {
    alert("Please upload only PDF or Word files.");
    return;
  }

    if (!profileName || !file) {
      setUploadMessage('Profile name is required.');
      return;
    }
    if(file.length === 0){
      
      setUploadMessage('Profile name is required.');
      return;
  }
  if(file.length > 10){

    setUploadMessage('please select less then 10 file.');
    return;
  }
  setIsLoading(true);
  const formData = new FormData();
  formData.append("profileName",profileName)
  for (let i = 0; i < file.length; i++) {
    console.log(`Appending file: ${file[i].name}`); // Debug
    formData.append("files", file[i]); // "files" must match the multer array key
  }
     
  try {
    
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
      });
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="resume-upload-container p-4 rounded-lg shadow-md bg-gray-50 max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4 text-center">Upload Resumes</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">Profile Name</label>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter profile name"
          />
        </div>
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-gray-700">Upload Files</label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Upload
        </button>
      </form>
      {isLoading && <div className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 flex justify-center items-center mt-4">
        uploading...</div>} 
      {uploadMessage && (
        <div className="mt-4 p-2 text-center text-sm text-white bg-green-500 rounded-md ">
          {uploadMessage}
        </div>
      )}
    </div>
    <S3Browser/>
    {/* <div>
      <form  onSubmit={handleUpload} >
      <input
        type="text"
        placeholder="Profile Name"
        value={profileName}
        onChange={(e) => setProfileName(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
      </form>
    </div> */}
    </Layout>
  );
};

export default UploadFile;

