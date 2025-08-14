import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome, FaHeadset } from "react-icons/fa";

const NotFound = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const bounce = {
    initial: { y: -20 },
    animate: { 
      y: [0, -15, 0],
      transition: { 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 font-sans">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-lg text-center max-w-md w-full mx-4 border border-gray-200"
      >
        <motion.div 
          variants={bounce}
          initial="initial"
          animate="animate"
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-red-50 rounded-full">
            <FaExclamationTriangle className="h-12 w-12 text-red-500" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <FaHeadset className="mr-2" />
              Contact Support
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="mt-10 text-gray-500 text-sm"
      >
        <p>Error code: 404 | Not Found</p>
      </motion.div>
    </div>
  );
};

export default NotFound;