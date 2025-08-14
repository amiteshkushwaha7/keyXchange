import { motion } from 'framer-motion';
import { FaCheckCircle, FaBan, FaGavel, FaExchangeAlt, FaExclamationTriangle, FaBalanceScale } from 'react-icons/fa';

const Terms = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <title>Terms & Conditions | Digital Goods Marketplace</title>
      <meta name="description" content="Our terms of service" />
      
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Terms and Conditions
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
                Welcome to Digital Goods Marketplace! These terms and conditions outline the rules and
                regulations for the use of our website and services.
              </p>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaCheckCircle className="text-purple-600" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 mt-4">
                  By accessing this website, you agree to be bound by these Terms and Conditions. If you
                  disagree with any part of these terms, you may not access the service.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaCheckCircle className="text-purple-600" />
                  2. User Accounts
                </h2>
                <p className="text-gray-600 mt-4">
                  When you create an account with us, you must provide accurate and complete information.
                  You are responsible for maintaining the confidentiality of your account and password.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaExchangeAlt className="text-purple-600" />
                  3. Purchases
                </h2>
                <p className="text-gray-600 mt-4">
                  All purchases are subject to availability. We reserve the right to cancel any order
                  for any reason. Prices are subject to change without notice.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaExclamationTriangle className="text-purple-600" />
                  4. Digital Goods
                </h2>
                <p className="text-gray-600 mt-4">
                  All digital goods are provided "as is" without warranty of any kind. We are not
                  responsible for the quality, accuracy, or legality of goods sold by third-party
                  sellers.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaExchangeAlt className="text-purple-600" />
                  5. Refund Policy
                </h2>
                <p className="text-gray-600 mt-4">
                  Due to the nature of digital goods, all sales are final unless otherwise specified.
                  Refunds may be issued at our sole discretion in exceptional circumstances.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaBan className="text-purple-600" />
                  6. Prohibited Uses
                </h2>
                <p className="text-gray-600 mt-4">You may not use our service:</p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>For any unlawful purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To violate any intellectual property rights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To distribute malware or harmful content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To engage in fraudulent activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>To interfere with the service's operation</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaExclamationTriangle className="text-purple-600" />
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-600 mt-4">
                  In no event shall Digital Goods Marketplace be liable for any indirect, incidental,
                  special or consequential damages arising out of or in connection with your use of our
                  services.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaGavel className="text-purple-600" />
                  8. Changes to Terms
                </h2>
                <p className="text-gray-600 mt-4">
                  We reserve the right to modify these terms at any time. Your continued use of the
                  service after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FaBalanceScale className="text-purple-600" />
                  9. Governing Law
                </h2>
                <p className="text-gray-600 mt-4">
                  These terms shall be governed by and construed in accordance with the laws of the
                  State of Delaware, without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  10. Contact Information
                </h2>
                <p className="text-gray-600 mt-4">
                  Questions about these terms should be sent to us at <span className="text-purple-600 font-medium">legal@digitalgoods.example</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Terms;