// import React, { useState } from 'react';
// import './Style.css';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// const ResetPasswordPopup = ({ id, isOpen, setIsOpen }) => {  // Added isOpen and setIsOpen as props
//     const navigate = useNavigate();
//     const [password, setPassword] = useState('');

//     const handleClose = () => {
//         setIsOpen(false);  // Close the popup
//         setPassword('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (password.length === 0) {
//             alert("Please enter a password.");
//         }
//         try {
//             const res = await axios.post("http://localhost:8080/update/password", { id, password });
//             console.log(res);
//         } catch (error) {
//             console.log(error);
//         }
//         alert("Password reset successful.");
//         handleClose();
//         navigate('/');
//     };

//     return (
//         <div>
//             {/* Render popup only if isOpen is true */}
//             {isOpen && (
//                 <div className="popup-overlay">
//                     <div className="popup-container">
//                         <h2>Reset Password</h2>
//                         <form onSubmit={handleSubmit}>
//                             <label htmlFor="password">Create New Password:</label>
//                             <input
//                                 type="text"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 placeholder="Enter new Password"
//                             />
//                             <div className="popup-buttons">
//                                 <button type="submit" className="submit-btn">
//                                     Reset
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="close-btn"
//                                     onClick={handleClose}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordPopup;











// import React, { useState } from 'react';
// import { Lock } from 'lucide-react'; // Importing the Lock icon for consistency with the theme
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const ResetPasswordPopup = ({ id, isOpen, setIsOpen }) => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState('');

//   const handleClose = () => {
//     setIsOpen(false);
//     setPassword('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password.length === 0) {
//       alert("Please enter a password.");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:8080/update/password", { id, password });
//       console.log(res);
//       alert("Password reset successful.");
//       handleClose();
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//       {/* Render popup only if isOpen is true */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-8 rounded-xl max-w-sm w-full space-y-6">
//             <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex items-center space-x-3 text-gray-300">
//                 <Lock className="h-5 w-5 text-gray-400" />
//                 <label htmlFor="password" className="text-sm">Create New Password:</label>
//               </div>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter new password"
//               />
//               <div className="flex justify-between space-x-4">
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//                 >
//                   Reset
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
//                   onClick={handleClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResetPasswordPopup;



// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff } from 'lucide-react';  // Import Eye and EyeOff icons for password visibility
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const ResetPasswordPopup = ({ id, isOpen, setIsOpen }) => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClose = () => {
//     setIsOpen(false);
//     setPassword('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password.length === 0) {
//       alert("Please enter a password.");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:8080/update/password", { id, password });
//       console.log(res);
//       alert("Password reset successful.");
//       handleClose();
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div>
//       {/* Render popup only if isOpen is true */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-8 rounded-xl max-w-sm w-full space-y-6">
//             <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex items-center space-x-3 text-gray-300">
//                 <Lock className="h-5 w-5 text-gray-400" />
//                 <label htmlFor="password" className="text-sm">Create New Password:</label>
//               </div>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter new password"
//                 />
//                 <button
//                   type="button"
//                   onMouseDown={togglePasswordVisibility}
//                   onMouseUp={togglePasswordVisibility}
//                   onMouseLeave={() => setShowPassword(false)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
//                 >
//                   {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
//                 </button>
//               </div>
//               <div className="flex justify-between space-x-4">
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
//                 >
//                   Reset
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
//                   onClick={handleClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResetPasswordPopup;




// ResetPasswordPopup.jsx
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ResetPasswordPopup = ({ id, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length === 0) {
      alert("Please enter a password.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/update/password", { id, password });
      alert("Password reset successful.");
      handleClose();
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl max-w-sm w-full space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-300">
            <Lock className="h-5 w-5 text-gray-400" />
            <label htmlFor="password" className="text-sm">Create New Password:</label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              className="w-full py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;