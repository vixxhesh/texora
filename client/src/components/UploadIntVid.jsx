import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const UploadIntVid = () => {
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video || !name) {
      setMessage("Please provide a video file and a name.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("name", name);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/interview-videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setVideo(null);
      setName("");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload the video.");
    }
  };

  const handleViewInterviews = () => {
    navigate("/list-videos");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-8 px-4">
        <div className="bg-opacity-40 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-6">
            Upload Interview Video
          </h2>
          {message && (
            <p
              className={`mb-4 text-sm font-medium ${
                message.includes("Failed") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                Video Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for the video"
              />
            </div>

            <div>
              <label
                htmlFor="video"
                className="block text-sm font-medium text-white mb-2"
              >
                Video File (MP4)
              </label>
              <input
                id="video"
                type="file"
                accept="video/mp4"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Upload
            </button>
          </form>
          <button
            onClick={handleViewInterviews}
            className="w-full mt-4 py-3 px-6 rounded-md bg-gray-700 text-white font-semibold shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            View Interviews
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UploadIntVid;
