import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const ListAudio = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [transcribing, setTranscribing] = useState({});

  // Fetch audio files from the API
  const fetchAudioFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/audio`
      );
      setAudioFiles(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching audio files:", error);
      setMessage("Failed to fetch audio files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle audio file deletion
  const handleDelete = async (key) => {
    try {
      const audioKey = key.endsWith(".mp3") ? key : `${key}.mp3`;
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/audio/delete?key=${audioKey}`
      );
      setMessage("Audio file deleted successfully.");
      fetchAudioFiles(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the audio file.";
      setMessage(errorMessage);
    }
  };

  // Handle audio file download
  const handleDownload = async (key) => {
    try {
      const audioKey = key.endsWith(".mp3") ? key : `${key}.mp3`;
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/audio/download?key=${audioKey}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", audioKey.split("/").pop()); // Set file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while downloading the audio file.";
      setMessage(errorMessage);
    }
  };

  // Handle audio transcription
  const handleTranscribe = async (key) => {
    try {
      setTranscribing({ ...transcribing, [key]: true });
      const audioKey = key.endsWith(".mp3") ? key : `${key}.mp3`;
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/audio/transcribe`,
        { key: audioKey }
      );
      setMessage(
        "Transcription initiated. You will be notified when complete."
      );
    } catch (error) {
      console.error("Transcription error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while transcribing the audio.";
      setMessage(errorMessage);
    } finally {
      setTranscribing({ ...transcribing, [key]: false });
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4">
        <div className="bg-opacity-40 bg-gray-800 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-white mb-6">Audio Files</h2>

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
            <p className="text-gray-400 text-center">Loading audio files...</p>
          ) : audioFiles.length === 0 ? (
            <p className="text-gray-400 text-center">No audio files found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audioFiles.map((audio) => (
                <div
                  key={audio.key}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <p className="text-lg font-medium text-white mb-2">
                      {audio.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Last Modified:</strong>{" "}
                      {new Date(audio.lastModified).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Size:</strong>{" "}
                      {(audio.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <audio
                      controls
                      className="w-full mb-3"
                      src={`${
                        import.meta.env.VITE_API_BASE_URL
                      }/api/audio/download?key=${audio.key}`}
                      // src={`http://localhost:8080/api/audio/download?key=${audio.key}`}
                    >
                      Your browser does not support the audio element.
                    </audio>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleDownload(audio.key)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleTranscribe(audio.key)}
                        className="py-2 px-4 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        disabled={transcribing[audio.key]}
                      >
                        {transcribing[audio.key]
                          ? "Transcribing..."
                          : "Transcribe"}
                      </button>
                      <button
                        onClick={() => handleDelete(audio.key)}
                        className="py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </div>
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

export default ListAudio;
