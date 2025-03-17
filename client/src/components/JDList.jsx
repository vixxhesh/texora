import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout"; // Importing a common layout

const JDList = () => {
  const [jdList, setJDList] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch the list of job descriptions
  const fetchJDList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jd/list");
      setJDList(response.data);
    } catch (error) {
      setMessage("Failed to fetch JD list.");
    }
  };

  const handleDelete = async (jdId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/jd/delete/${jdId}`
      );
      setMessage(response.data.message);

      // Refresh the JD list after deletion
      fetchJDList();
    } catch (error) {
      setMessage("Failed to delete the JD.");
    }
  };
  // Handle the download of a job description
  const handleDownload = async (jdId, jdName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/jd/download/${jdId}`,
        {
          responseType: "blob", // To handle file download
        }
      );

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${jdName}.pdf`); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setMessage("Failed to download the JD.");
    }
  };

  // Handle the extraction of job description details
  const handleExtract = (jdId) => {
    alert(`Extracting details from JD ID: ${jdId}`);
    // Implement extraction logic or redirect here
  };

  // Fetch job descriptions on component mount
  useEffect(() => {
    fetchJDList();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Uploaded Job Descriptions
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
        <div className="w-full max-w-3xl grid grid-cols-1 gap-6">
          {jdList.length === 0 ? (
            <p className="text-gray-500 text-center">
              No job descriptions found.
            </p>
          ) : (
            jdList.map((jd) => (
              <div
                key={jd._id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    <strong>Name:</strong> {jd.name || "N/A"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload(jd._id, jd.name)}
                    className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleExtract(jd._id)}
                    className="py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Extract
                  </button>
                  <button
                    onClick={() => handleDelete(jd._id)}
                    className="py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JDList;
