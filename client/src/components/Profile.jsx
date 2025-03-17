// import React, { useState } from 'react'; // Added useState
// import axios from 'axios';
// import ResetPasswordPopup from './ResetPasswordPopup';

// const Profile = () => {
//     const jsonData = localStorage.getItem("userData");
//     const userData = JSON.parse(jsonData);

//     // State to control popup visibility (added this state)
//     const [isOpen, setIsOpen] = useState(false);  // Added this line

//     return (
//         <div className="profile-container">
//             <h1 className="profile-title">Profile</h1>
//             <div className="profile-details">
//                 <h3>Name: <span>{userData.name}</span></h3>
//                 <h3>Email: <span>{userData.email}</span></h3>
//                 <h3>Phone No.: <span>{userData.phoneNumber}</span></h3>
//                 <h3>Role: <span>{userData.role}</span></h3>
//             </div>

//             {/* Button to open ResetPasswordPopup, moved from ResetPasswordPopup component */}
//             <button className="open-popup-btn" onClick={() => setIsOpen(true)}>
//                 Reset Password
//             </button>

//             {/* Render the ResetPasswordPopup here */}
//             <ResetPasswordPopup id={userData._id} isOpen={isOpen} setIsOpen={setIsOpen} />
//         </div>
//     );
// };

// export default Profile;






// import React, { useState } from 'react';
// import { User, Mail, Phone, Shield } from 'lucide-react';  // Import necessary icons
// import ResetPasswordPopup from './ResetPasswordPopup';

// const Profile = () => {
//   const jsonData = localStorage.getItem('userData');
//   const userData = JSON.parse(jsonData);

//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     // <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
//       <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
//         <div>
//           <h2 className="text-3xl font-bold text-white text-center">Profile</h2>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-center space-x-4 text-gray-300">
//             <User className="h-5 w-5 text-gray-400" />
//             <h3 className="text-sm">Name: <span className="font-semibold">{userData.name}</span></h3>
//           </div>

//           <div className="flex items-center space-x-4 text-gray-300">
//             <Mail className="h-5 w-5 text-gray-400" />
//             <h3 className="text-sm">Email: <span className="font-semibold">{userData.email}</span></h3>
//           </div>

//           <div className="flex items-center space-x-4 text-gray-300">
//             <Phone className="h-5 w-5 text-gray-400" />
//             <h3 className="text-sm">Phone No.: <span className="font-semibold">{userData.phoneNumber}</span></h3>
//           </div>

//           <div className="flex items-center space-x-4 text-gray-300">
//             <Shield className="h-5 w-5 text-gray-400" />
//             <h3 className="text-sm">Role: <span className="font-semibold">{userData.role}</span></h3>
//           </div>
//         </div>

//         <button
//           className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//           onClick={() => setIsOpen(true)}
//         >
//           Reset Password
//         </button>

//         {/* Render the ResetPasswordPopup here */}
//         <ResetPasswordPopup id={userData._id} isOpen={isOpen} setIsOpen={setIsOpen} />
//       </div>
//     // </div>
//   );
// };

// export default Profile;

//////////////////////////////////


// // Profile.jsx
// import React, { useState } from 'react';
// import { User, Mail, Phone, Shield } from 'lucide-react';
// import ResetPasswordPopup from './ResetPasswordPopup';

// const Profile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const jsonData = localStorage.getItem('userData');
//   const userData = JSON.parse(jsonData);

//   return (
//     <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
//       <div>
//         <h2 className="text-3xl font-bold text-white text-center">Profile</h2>
//       </div>

//       <div className="space-y-6">
//         <div className="flex items-center space-x-4 text-gray-300">
//           <User className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Name: <span className="font-semibold">{userData.name}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Mail className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Email: <span className="font-semibold">{userData.email}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Phone className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Phone No.: <span className="font-semibold">{userData.phoneNumber}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Shield className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Role: <span className="font-semibold">{userData.role}</span></h3>
//         </div>
//       </div>

//       <button
//         className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//         onClick={() => setIsOpen(true)}
//       >
//         Reset Password
//       </button>

//       <ResetPasswordPopup id={userData._id} isOpen={isOpen} setIsOpen={setIsOpen} />
//     </div>
//   );
// };

// export default Profile;


///////////////////////////..

// import React, { useState } from 'react';
// import { User, Mail, Phone, Shield } from 'lucide-react';
// import ResetPasswordPopup from './ResetPasswordPopup';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
  
//   // Safely get and parse userData
//   const getUserData = () => {
//     try {
//       const jsonData = localStorage.getItem('userData');
//       if (!jsonData) {
//         // Handle case when userData doesn't exist
//         return null;
//       }
//       return JSON.parse(jsonData);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       return null;
//     }
//   };

//   const userData = getUserData();

//   // If no userData is found, show an error state
//   if (!userData) {
//     return (
//       <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-white mb-4">Session Expired</h2>
//           <p className="text-gray-300 mb-6">Please log in again to view your profile.</p>
//           <button
//             onClick={() => navigate('/login')}
//             className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
//       <div>
//         <h2 className="text-3xl font-bold text-white text-center">Profile</h2>
//       </div>

//       <div className="space-y-6">
//         <div className="flex items-center space-x-4 text-gray-300">
//           <User className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Name: <span className="font-semibold">{userData.name}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Mail className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Email: <span className="font-semibold">{userData.email}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Phone className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Phone No.: <span className="font-semibold">{userData.phoneNumber}</span></h3>
//         </div>

//         <div className="flex items-center space-x-4 text-gray-300">
//           <Shield className="h-5 w-5 text-gray-400" />
//           <h3 className="text-sm">Role: <span className="font-semibold">{userData.role}</span></h3>
//         </div>
//       </div>

//       <button
//         className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//         onClick={() => setIsOpen(true)}
//       >
//         Reset Password
//       </button>

//       <ResetPasswordPopup id={userData._id} isOpen={isOpen} setIsOpen={setIsOpen} />
//     </div>
//   );
// };

// export default Profile;

/////////////////////////

// Profile.jsx
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield } from 'lucide-react';
import ResetPasswordPopup from './ResetPasswordPopup';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('userData');
      if (!storedData) {
        console.log('No user data found in localStorage');
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(storedData);
      if (!parsedData || !parsedData.email) {
        console.log('Invalid user data format');
        setLoading(false);
        return;
      }

      setUserData(parsedData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">Session Expired</h2>
          <p className="text-gray-300 mb-6">Please log in again to view your profile.</p>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
      <div>
        <h2 className="text-3xl font-bold text-white text-center">Profile</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4 text-gray-300">
          <User className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm">Name: <span className="font-semibold">{userData.name}</span></h3>
        </div>

        <div className="flex items-center space-x-4 text-gray-300">
          <Mail className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm">Email: <span className="font-semibold">{userData.email}</span></h3>
        </div>

        <div className="flex items-center space-x-4 text-gray-300">
          <Phone className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm">Phone No.: <span className="font-semibold">{userData.phoneNumber}</span></h3>
        </div>

        <div className="flex items-center space-x-4 text-gray-300">
          <Shield className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm">Role: <span className="font-semibold">{userData.role}</span></h3>
        </div>
      </div>

      <button
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Reset Password
      </button>

      {userData && <ResetPasswordPopup id={userData._id} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Profile;