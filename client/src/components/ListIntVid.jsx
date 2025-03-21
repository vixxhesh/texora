import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const ListIntVid = () => {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState({});

  // Fetch videos from the API
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/interview-videos`
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
  const handleDelete = async (key) => {
    try {
      const videoKey = key.endsWith(".mp4") ? key : `${key}.mp4`;
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/interview-videos/delete?key=${videoKey}`
      );
      setMessage("Video deleted successfully.");
      fetchVideos(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the video.";
      setMessage(errorMessage);
    }
  };

  // Handle video download
  const handleDownload = async (key) => {
    try {
      const videoKey = key.endsWith(".mp4") ? key : `${key}.mp4`;
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/interview-videos/download?key=${videoKey}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", videoKey.split("/").pop()); // Set file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while downloading the video.";
      setMessage(errorMessage);
    }
  };

  // Handle video conversion to MP3
  const handleConvertToMp3 = async (key) => {
    try {
      setConverting({ ...converting, [key]: true });
      const response = await axios.post(
        `http://localhost:8080/api/interview-videos/convert-to-mp3`,
        { key }
      );
      setMessage("Video successfully converted to MP3.");
    } catch (error) {
      console.error("Conversion error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while converting the video to MP3.";
      setMessage(errorMessage);
    } finally {
      setConverting({ ...converting, [key]: false });
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
            <div
              className={`mb-4 p-3 rounded-md ${
                message.toLowerCase().includes("failed") ||
                message.toLowerCase().includes("error")
                  ? "bg-red-900 bg-opacity-50 text-red-200"
                  : "bg-green-900 bg-opacity-50 text-green-200"
              }`}
            >
              <p className="text-sm font-medium">{message}</p>
            </div>
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
                  <div>
                    <p className="text-lg font-medium text-white mb-2">
                      {video.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Last Modified:</strong>{" "}
                      {new Date(video.lastModified).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Size:</strong>{" "}
                      {(video.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleDownload(video.key)}
                      className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleConvertToMp3(video.key)}
                      className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      disabled={converting[video.key]}
                    >
                      {converting[video.key]
                        ? "Converting..."
                        : "Convert to MP3"}
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
