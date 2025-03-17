import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import PendingRegistrations from "./components/PendingRegistration";
import InterviewScheduling from "./components/InterviewScheduling";
import AssignedTasks from "./components/AssignedTasks";
import JDUpload from "./components/JDUpload";
import JDList from "./components/JDList";

import UploadFile from "./components/UploadForm";
import UploadIntVid from "./components/UploadIntVid";
import ListIntVid from "./components/ListIntVid";
// >>>>>>> 6e0a9ce41bd0af918a42c0bf704abd70f9f96417

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for token and role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  // Function to update authentication state after login
  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading spinner while checking auth
    }

    if (!isAuthenticated) {
      return <Navigate to="/logIn" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return (
        <Navigate
          to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
        />
      );
    }

    return children;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route
            path="/logIn"
            element={<LogIn onLogin={handleLogin} />} // Pass onLogin to LogIn component
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-registrations"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PendingRegistrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interviews-scheduling"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <InterviewScheduling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-management"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UploadFile />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assigned-tasks"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <AssignedTasks />
              </ProtectedRoute>
            }
          />

          {/* JD Manager Routes */}
          <Route
            path="/jd-upload"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <JDUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jd-list"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <JDList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-video"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UploadIntVid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-videos"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <ListIntVid />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                  <p className="text-gray-400 mb-8">Page Not Found</p>
                  <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
