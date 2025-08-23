import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX, FiGithub } from 'react-icons/fi';

const DevelopmentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-md z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiAlertTriangle className="text-xl" />
                </div>
                <div>
                  <p className="font-bold">Development Notice</p>
                  <p className="text-sm opacity-90 mt-1">
                    This website is currently under active development. Some features may be incomplete.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close notification"
              >
                <FiX className="text-lg" />
              </motion.button>
            </div>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-1 bg-white/30 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevelopmentBanner;