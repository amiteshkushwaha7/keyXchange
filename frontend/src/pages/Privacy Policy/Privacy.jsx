import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserEdit, FaTrashAlt, FaExchangeAlt, FaPaperPlane } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <title>Privacy Policy | Digital Goods Marketplace</title>
      <meta name="description" content="How we protect and use your data" />
      
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Last updated: January 1, 2023
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-10"
          >
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-600 leading-relaxed">
                At Digital Goods Marketplace, we respect your privacy and are committed to protecting
                your personal data. This privacy policy will inform you about how we look after your
                personal data when you visit our website and tell you about your privacy rights.
              </p>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaShieldAlt className="text-purple-600" />
                  1. Information We Collect
                </h2>
                <p className="text-gray-600 mt-4">
                  We may collect, use, store and transfer different kinds of personal data about you:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Identity Data (name, username, date of birth)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Contact Data (email address, phone number)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Financial Data (payment card details, though we don't store them directly)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Transaction Data (details about payments to and from you)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Technical Data (IP address, browser type, location)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Usage Data (how you use our website and services)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaLock className="text-purple-600" />
                  2. How We Use Your Data
                </h2>
                <p className="text-gray-600 mt-4">We will only use your personal data when the law allows us to:</p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To register you as a new customer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To process and deliver your orders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To manage our relationship with you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To improve our website and services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To prevent fraud and ensure security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To comply with legal obligations</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Data Security
                </h2>
                <p className="text-gray-600 mt-4">
                  We have implemented appropriate security measures to prevent your personal data from
                  being accidentally lost, used or accessed in an unauthorized way. We limit access to
                  your personal data to those employees and partners who have a business need to know.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Data Retention
                </h2>
                <p className="text-gray-600 mt-4">
                  We will only retain your personal data for as long as necessary to fulfill the purposes
                  we collected it for, including for the purposes of satisfying any legal, accounting,
                  or reporting requirements.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaUserEdit className="text-purple-600" />
                  5. Your Legal Rights
                </h2>
                <p className="text-gray-600 mt-4">Under certain circumstances, you have rights under data protection laws:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaUserEdit />
                      Request access to your personal data
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaUserEdit />
                      Request correction of your data
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaTrashAlt />
                      Request erasure of your data
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaExchangeAlt />
                      Object to processing of your data
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaExchangeAlt />
                      Request restriction of processing
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-purple-700 font-medium">
                      <FaPaperPlane />
                      Request transfer of your data
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Contact Us
                </h2>
                <p className="text-gray-600 mt-4">
                  If you have any questions about this privacy policy or our privacy practices, please
                  contact our data privacy manager at <span className="text-purple-600 font-medium">privacy@digitalgoods.example</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy;