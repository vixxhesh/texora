import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserCircle,
  LayoutDashboard,
  Users,
  CheckSquare,
  LogOut,
} from "lucide-react";
import Profile from "./Profile";
import ResetPasswordPopup from "./ResetPasswordPopup";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  //added new code
  const userRole = localStorage.getItem("role");
  const [showProfile, setShowProfile] = useState(false);

  // <<<<<<< HEAD
  //   const adminMenuItems = [
  //     { title: "Dashboard", path: "/admin-dashboard", icon: LayoutDashboard },
  //     {
  //       title: "Pending Registrations",
  //       path: "/pending-registrations",
  //       icon: Users,
  //     },
  //     // add Interview schedule (Asad)
  //   ];

  //   const userMenuItems = [
  //     { title: "Dashboard", path: "/user-dashboard", icon: LayoutDashboard },
  //     { title: "Assigned Tasks", path: "/assigned-tasks", icon: CheckSquare },
  //     { title: "Talent Craft", path: "/", icon: CheckSquare },
  //     { title: "JD Analysis", path: "/jd-upload", icon: LayoutDashboard },
  //     {
  //       title: "Interview Scheduling",
  //       path: "/interviews-scheduling",
  //       icon: CheckSquare,
  //     },
  //   ];

  //   const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;
  // =======
  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return [
          {
            title: "Dashboard",
            path: "/admin-dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Pending Registrations",
            path: "/pending-registrations",
            icon: Users,
          },
        ];
      case "user":
        return [
          
          {
            title: "Dashboard",
            path: "/user-dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Assigned Tasks",
            path: "/assigned-tasks",
            icon: CheckSquare,
          },
          {
            title: "Resume-Management",
            path: "/resume-management",
            icon: LayoutDashboard,
          },
          { title: "Talent Craft", path: "/", icon: CheckSquare },
          { title: "JD Analysis", path: "/jd-upload", icon: LayoutDashboard },

          { title: "Talent Craft", path: "/jd-upload", icon: CheckSquare },
          { title: "JD Analysis", path: "", icon: LayoutDashboard },
          {
            title: "Interview Scheduling",
            path: "/interviews-scheduling",
            icon: CheckSquare,
          },
          {
            title: "Upload Interview",
            path: "/upload-video",
            icon: CheckSquare,
          },
        ];
      default:
        return [];
    }
  };
  // >>>>>>> bd77b56f75e49f0aa7a69b56c673ae2037fe000b

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    navigate("/login");

    //   const userRole = localStorage.getItem("role");
    //      const [showProfile, setShowProfile] = useState(false);

    //   const adminMenuItems = [
    //     { title: "Dashboard", path: "/admin-dashboard", icon: LayoutDashboard },
    //     {
    //       title: "Pending Registrations",
    //       path: "/pending-registrations",
    //       icon: Users,
    //     },
    //     // add Interview schedule (Asad)
    //     { title: "Interview Scheduling",path:"/interviews-scheduling", icon: CheckSquare,
    //     }
    //   ];

    //   const userMenuItems = [
    //     { title: "Dashboard", path: "/user-dashboard", icon: LayoutDashboard },
    //     { title: "Assigned Tasks", path: "/assigned-tasks", icon: CheckSquare },
    //     { title: "Talent Craft", path: "/", icon: CheckSquare },
    //     { title: "JD Analysis", path: "/jd-upload", icon: LayoutDashboard },
    //   ];

    //   const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;

    //   const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("role");
    //     navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-20 bg-gray-900">
          <h1 className="text-white text-xl font-bold">Texora AI</h1>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            {getMenuItems().map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </button>
              );
            })}
          </nav>
          <div className="p-4 space-y-2">
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <UserCircle className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <div className="md:hidden flex items-center justify-between p-4 bg-gray-800">
          <h1 className="text-white text-xl font-bold">Texora AI</h1>
          <button
            onClick={handleProfileClick}
            className="text-gray-300 hover:text-white"
          >
            <UserCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-300 rounded-lg p-3 max-w-md w-full mx-4">
              <Profile />
              <ResetPasswordPopup />
              <button
                onClick={handleProfileClick}
                className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
