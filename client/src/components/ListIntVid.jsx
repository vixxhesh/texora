import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const ListIntVid = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch videos from the API
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/interview-videos"
      );
      setVideos(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching videos:", error);
      setMessage("Failed to fetch videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle video deletion
  // Handle video deletion
  const handleDelete = async (key) => {
    try {
      const videoKey = key.endsWith(".mp4") ? key : `${key}.mp4`;
      await axios.delete(
        `http://localhost:8080/api/interview-videos/delete?filekey=${videoKey}`
      );
      alert("Video deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the video.";
      alert(errorMessage);
    }
  };

  // Handle video download
  const handleDownload = async (filename) => {
    try {
      const videoKey = filename.endsWith(".mp4") ? filename : `${filename}.mp4`;
      const response = await axios.get(
        `http://localhost:8080/api/interview-videos/download/${videoKey}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Specify file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while downloading the video.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4">
        <div className="bg-opacity-40 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Interview Videos
          </h2>

          {message && (
            <p
              className={`mb-4 text-sm font-medium ${
                message.toLowerCase().includes("failed")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}

          {loading ? (
            <p className="text-gray-400 text-center">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-gray-400 text-center">No videos found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.key}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <p className="text-lg font-medium text-white mb-4">
                    <strong>Name:</strong> {video.name}
                    <strong> Key:</strong> {video.key}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Last Modified:</strong>{" "}
                    {new Date(video.lastModified).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    <strong>Size:</strong>{" "}
                    {(video.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDownload(video.key, video.name)}
                      className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Download
                    </button>
                    <button
                      onClick={() =>
                        alert("Convert to MP3 functionality coming soon!")
                      }
                      className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Convert to MP3
                    </button>
                    <button
                      onClick={() => handleDelete(video.key)}
                      className="py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListIntVid;
