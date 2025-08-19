import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserEdit, FaTrashAlt, FaExchangeAlt, FaPaperPlane, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import { useRef } from "react";

const PrivacyPolicy = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Add refs for scroll
  const policyRef = useRef(null);
  const topRef = useRef(null);

  const handleScrollToPolicy = () => {
    if (policyRef.current) {
      policyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <title>Privacy Policy | Digital Goods Marketplace</title>
      <meta name="description" content="How we protect and use your data" />
      
      <div ref={topRef} className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-800 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl"
          >
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold sm:text-5xl mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-blue-100">
                Last updated: January 1, 2023
              </p>
              <div className="mt-8 flex justify-center">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 border border-white/30 shadow-lg text-white cursor-pointer transition hover:bg-white/30"
                  aria-label="Scroll to read privacy policy"
                  onClick={handleScrollToPolicy}
                  role="button"
                  tabIndex={0}
                  onKeyPress={e => { if (e.key === 'Enter') handleScrollToPolicy(); }}
                >
                  <span>Scroll to read</span>
                  <FaChevronRight className="ml-2 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          ref={policyRef}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Introduction */}
            <motion.div
              variants={sectionVariants}
              className="p-8 sm:p-10 bg-gradient-to-r from-blue-50 to-indigo-50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Digital Goods Marketplace, we respect your privacy and are committed to protecting
                your personal data. This privacy policy explains how we collect, use, and safeguard
                your information when you use our services.
              </p>
              <div className="mt-6 p-4 bg-blue-100 rounded-lg flex items-start">
                <FaInfoCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <p className="text-blue-800">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </motion.div>

            {/* Policy Sections */}
            <div className="divide-y divide-gray-200">
              {/* Information We Collect */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <FaShieldAlt className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      1. Information We Collect
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We may collect, use, store and transfer different kinds of personal data about you:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Identity Data", content: "Name, username, or similar identifier" },
                        { title: "Contact Data", content: "Email address, phone number" },
                        { title: "Transaction Data", content: "Details about payments and purchases" },
                        { title: "Technical Data", content: "IP address, browser type, device information" },
                        { title: "Usage Data", content: "How you use our website and services" },
                        { title: "Marketing Data", content: "Your preferences for receiving marketing" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700 text-sm">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Your Data */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <FaLock className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      2. How We Use Your Data
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We will only use your personal data when the law allows us to:
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Register you as a new customer and manage your account",
                        "Process and deliver your orders including managing payments",
                        "Manage our relationship with you including notifying you of changes",
                        "Enable you to participate in promotions or surveys",
                        "Improve our website, services, and customer experiences",
                        "Recommend products or services that may interest you",
                        "Prevent fraud and enhance security",
                        "Comply with legal and regulatory requirements"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  3. Data Security
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
                  <p className="text-gray-700 font-medium mb-3">
                    We implement robust security measures to protect your personal data:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Encryption of data in transit (SSL/TLS)",
                      "Secure server infrastructure with firewalls",
                      "Regular security audits and penetration testing",
                      "Limited access to personal data on a need-to-know basis",
                      "Multi-factor authentication for administrative access",
                      "Regular employee privacy training"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  We have procedures in place to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                </p>
              </motion.div>

              {/* Data Retention */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  4. Data Retention
                </h2>
                <p className="text-gray-700 mb-6">
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Data Type</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-medium">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { type: "Account Information", period: "5 years after account closure" },
                        { type: "Transaction Records", period: "7 years for tax purposes" },
                        { type: "Marketing Preferences", period: "3 years after last interaction" },
                        { type: "Customer Support Records", period: "3 years after resolution" },
                        { type: "Website Analytics", period: "2 years from collection" }
                      ].map((item, index) => (
                        <tr key={index}>
                          <td className="py-3 px-4 text-gray-700">{item.type}</td>
                          <td className="py-3 px-4 text-gray-700">{item.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Your Legal Rights */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                    <FaUserEdit className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      5. Your Legal Rights
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Under data protection laws, you have rights including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: <FaUserEdit className="text-blue-600" />, title: "Access", content: "Request copies of your personal data" },
                        { icon: <FaUserEdit className="text-blue-600" />, title: "Correction", content: "Request correction of inaccurate data" },
                        { icon: <FaTrashAlt className="text-blue-600" />, title: "Erasure", content: "Request deletion of your personal data" },
                        { icon: <FaExchangeAlt className="text-blue-600" />, title: "Objection", content: "Object to our processing of your data" },
                        { icon: <FaExchangeAlt className="text-blue-600" />, title: "Restriction", content: "Request restriction of processing" },
                        { icon: <FaPaperPlane className="text-blue-600" />, title: "Portability", content: "Request transfer of your data" }
                      ].map((item, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              {item.icon}
                            </div>
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <p className="text-gray-700 text-sm">{item.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        To exercise any of these rights, please contact us at <span className="text-blue-600 font-medium">amiteshkushwaha2020@gmail.com</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Us */}
              <motion.div
                variants={sectionVariants}
                className="p-8 sm:p-10 bg-gray-50"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  6. Contact Us
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer:
                  </p>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> privacy@digitalgoods.example
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Mail:</span> Data Protection Officer, Digital Goods Marketplace, 123 Privacy Lane, Delaware, USA
                    </p>
                    <p className="text-gray-700">
                      We aim to respond to all legitimate requests within one month.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Policy Footer */}
            <motion.div
              variants={sectionVariants}
              className="p-8 sm:p-10 bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center"
            >
              <h3 className="text-xl font-bold mb-4">
                Thank you for trusting us with your information
              </h3>
              <p className="max-w-2xl mx-auto opacity-90">
                We regularly review our privacy policy and will post any updates on this webpage.
              </p>
              <div className="mt-6">
                <button
                  className="px-6 py-2 bg-white text-blue-800 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={handleScrollToTop}
                >
                  Back to Top
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy;