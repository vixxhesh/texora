import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const JDUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!file || !name) {
      setMessage("Please provide both a file and a name.");
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("files", file);
    formData.append("name", name);

    try {
      // Send a POST request to upload the file
      const response = await axios.post(
        "http://localhost:8080/api/jd/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set success message and reset inputs
      setMessage(response.data.message || "File uploaded successfully.");
      setFile(null);
      setName("");

      // Check and invoke callback after successful upload
      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(); // Refresh list or update UI
      } else {
        console.warn("onUploadSuccess is not defined or not a function.");
      }
    } catch (error) {
      console.error("Upload error:", error);

      // Provide a detailed error message to the user
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || "Failed to upload the file.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Upload Job Description
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Upload File
              </label>
              <input
                type="file"
                id="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Upload
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm font-medium text-center ${
                message.includes("Failed") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
          <button
            onClick={() => navigate("/jd-list")}
            className="mt-6 w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            View Job Descriptions
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default JDUpload;
