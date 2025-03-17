import React, { useState, useEffect } from "react";

const S3Browser = () => {
  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch subfolders on mount
  useEffect(() => {
    const fetchSubfolders = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/subfolders");
        const data = await response.json();
        setSubfolders(data.subfolders || []);
      } catch (error) {
        console.error("Error fetching subfolders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubfolders();
  }, []);

  // Fetch files in a subfolder
  const fetchFiles = async (folder) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/files?subfolder=${folder}`);
      const data = await response.json();
      setFiles(data.files || []);
      setCurrentFolder(folder);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file download
  const downloadFile = async (file) => {
    try {
      const response = await fetch(`http://localhost:8080/api/download?fileKey=Resume/${currentFolder}/${file}`);
      const data = await response.json();
      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">S3 Browser</h1>

      {/* Show Subfolders */}
      {!currentFolder && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="text-center text-lg text-white">Loading subfolders...</div>
          ) : (
            subfolders.map((folder, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => fetchFiles(folder)}
              >
                <h2 className="text-lg font-semibold text-center">{folder}</h2>
              </div>
            ))
          )}
        </div>
      )}

      {/* Show Files */}
      {currentFolder && (
        <div>
          <button
            onClick={() => {
              setCurrentFolder(null);
              setFiles([]);
            }}
            className="mb-4 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Subfolders
          </button>

          <h2 className="text-xl font-bold mb-4 text-center text-white">Files in {currentFolder}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="text-center text-lg">Loading files...</div>
            ) : (
              files.map((file, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-sm font-semibold break-words mb-2">{file}</h2>
                  <button
                    onClick={() => downloadFile(file)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default S3Browser;
