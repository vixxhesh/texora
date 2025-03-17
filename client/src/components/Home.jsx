import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaChartLine,
  FaCloudUploadAlt,
  FaFileAlt,
  FaVideo,
  FaLightbulb,
} from "react-icons/fa";
import InsightReview from "../assets/images/image6.jpg";
import Image2 from "../assets/images/image5.jpg";
import Image3 from "../assets/images/image3.jpg";
import Image4 from "../assets/images/image.jpg";
import Image5 from "../assets/images/image4.jpg";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-50 backdrop-blur-lg shadow-md z-50">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-blue-500">Texora</span> AI
        </h1>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/logIn")}
            className="px-4 py-2 text-sm md:text-base font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Reinvented
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signIn")}
            className="px-4 py-2 text-sm md:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            ATS
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-6">
        {/* Floating Gradient Background */}
        <motion.div
          className="absolute w-[120%] h-[120%] bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-20 blur-3xl animate-holographic"
          animate={{
            rotate: [0, 360],
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        {/* Hero Content */}
        <div className="relative text-center p-10 backdrop-blur-md bg-white bg-opacity-5 rounded-xl shadow-lg max-w-3xl border border-white border-opacity-10">
          <h1 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
            Revolutionize Recruitment with Texora AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-6">
            Streamline workflows, analyze insights, and make data-driven hiring
            decisions with our AI-powered tools tailored for HR professionals.
          </p>
          <div className="mt-10 space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/logIn")}
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signIn")}
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-red-500 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
          Why Choose Texora AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <FaUser className="text-3xl text-white" />,
              title: "TalentCraft",
              description:
                "Upload, parse, and organize resumes while leveraging AI to map skills to job descriptions.",
              gradient: "from-blue-500 to-purple-500",
              image: Image2, // Placeholder image
            },
            {
              icon: <FaCalendarAlt className="text-3xl text-white" />,
              title: "ZoomAlign",
              description:
                "Simplify interview scheduling with natural language processing and Zoom integration.",
              gradient: "from-green-500 to-blue-500",
              image: InsightReview, // Placeholder image
            },
            {
              icon: <FaChartLine className="text-3xl text-white" />,
              title: "InsightReview",
              description:
                "Analyze interview recordings with OpenAI to gain actionable insights and improve decision-making.",
              gradient: "from-pink-500 to-red-500",
              image: Image3, // Placeholder image
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-8 backdrop-blur-md bg-white bg-opacity-5 rounded-xl shadow-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all"
            >
              <div
                className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full mx-auto`}
              >
                {feature.icon}
              </div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mt-6">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-300">{feature.description}</p>
              <div className="mt-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Elements Section */}
      <section className="py-20 px-6 relative">
        <motion.div
          className="absolute w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 top-20 left-10 animate-float"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute w-40 h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl opacity-30 bottom-20 right-10 animate-float"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
          Modern Recruitment, Simplified
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              icon: <FaCloudUploadAlt className="text-3xl text-white" />,
              title: "AI-Powered Recruitment",
              description:
                "Texora AI leverages OpenAI to streamline recruitment workflows, making it easier for HR professionals to manage resumes, schedule interviews, and analyze candidate performance.",
              gradient: "from-blue-500 to-purple-500",
              image: Image4, // Placeholder image
            },
            {
              icon: <FaFileAlt className="text-3xl text-white" />,
              title: "Seamless Integration with AWS S3",
              description:
                "With AWS S3 integration, Texora AI ensures secure and scalable storage for all your recruitment data, from resumes to interview recordings.",
              gradient: "from-green-500 to-blue-500",
              image: Image5, // Placeholder image
            },
          ].map((content, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-8 backdrop-blur-md bg-white bg-opacity-5 rounded-xl shadow-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all"
            >
              <div
                className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${content.gradient} rounded-full mx-auto`}
              >
                {content.icon}
              </div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mt-6">
                {content.title}
              </h3>
              <p className="mt-4 text-gray-300">{content.description}</p>
              <div className="mt-6">
                <img
                  src={content.image}
                  alt={content.title}
                  className="rounded-lg shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
          Conclusion
        </h2>
        <div className="p-8 backdrop-blur-md bg-white bg-opacity-5 rounded-xl shadow-lg max-w-3xl mx-auto border border-white border-opacity-10">
          <p className="text-lg md:text-xl text-gray-300">
            Texora AI provides an integrated ecosystem tailored for modern
            recruitment needs. With TalentCraft, ZoomAlign, and InsightReview,
            you can streamline HR processes, reduce manual effort, and improve
            decision-making, making Texora AI an indispensable tool for
            recruiters and HR professionals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
