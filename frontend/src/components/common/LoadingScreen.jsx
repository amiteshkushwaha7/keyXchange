import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-[9999]"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          },
          scale: {
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
        className="text-purple-600"
      >
        <FaSpinner className="h-16 w-16" />
      </motion.div>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-lg font-medium text-gray-700"
      >
        Loading your experience...
      </motion.p>
      
      <motion.div 
        className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: ["0%", "50%", "100%", "0%"],
            transition: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
}