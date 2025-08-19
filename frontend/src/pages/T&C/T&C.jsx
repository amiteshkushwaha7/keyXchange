import { motion } from 'framer-motion';
import { FaCheckCircle, FaBan, FaGavel, FaExchangeAlt, FaExclamationTriangle, FaBalanceScale, FaChevronRight } from 'react-icons/fa';
import { useRef } from "react";

const Terms = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const termsRef = useRef(null);
  const topRef = useRef(null);

  const handleScrollToTerms = () => {
    if (termsRef.current) {
      termsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <title>Terms & Conditions | Digital Goods Marketplace</title>
      <meta name="description" content="Our terms of service" />

      <div ref={topRef} className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-800 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl"
          >
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Last updated: July 17, 2025
            </p>
            <div className="mt-8 flex justify-center">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 border border-white/30 shadow-lg text-white cursor-pointer transition hover:bg-white/30"
                aria-label="Scroll to read terms"
                onClick={handleScrollToTerms}
                role="button"
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter') handleScrollToTerms(); }}
              >
                <span className="mr-2">Scroll to read</span>
                <FaChevronRight className="animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          ref={termsRef}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Digital Goods Marketplace</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions outline the rules and regulations for the use of our website and services.
                By accessing this platform, you accept these terms in full. If you disagree with any part of these terms,
                you must not use our services.
              </p>
            </motion.div>

            {/* Terms Sections */}
            <div className="divide-y divide-gray-200">
              {[
                {
                  icon: <FaCheckCircle className="text-purple-600" />,
                  title: "Acceptance of Terms",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        By accessing this website, you agree to be bound by these Terms and Conditions. If you
                        disagree with any part of these terms, you may not access the service.
                      </p>
                      <p className="text-gray-700">
                        Your use of our services constitutes your agreement to all such terms, conditions, and notices.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaCheckCircle className="text-purple-600" />,
                  title: "User Accounts",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        When you create an account with us, you must provide accurate and complete information.
                        You are solely responsible for maintaining the confidentiality of your account and password.
                      </p>
                      <p className="text-gray-700">
                        You agree to immediately notify us of any unauthorized use of your account or any other breaches
                        of security.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaExchangeAlt className="text-purple-600" />,
                  title: "Purchases",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        All purchases are subject to availability. We reserve the right to cancel any order
                        for any reason. Prices are subject to change without notice.
                      </p>
                      <p className="text-gray-700">
                        You agree to provide current, complete, and accurate purchase and account information for all
                        purchases made on our platform.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaExclamationTriangle className="text-purple-600" />,
                  title: "Digital Goods",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        All digital goods are provided "as is" without warranty of any kind. We are not
                        responsible for the quality, accuracy, or legality of goods sold by third-party
                        sellers.
                      </p>
                      <p className="text-gray-700">
                        The description of digital goods on our platform does not imply endorsement or verification
                        of their quality or legality.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaExchangeAlt className="text-purple-600" />,
                  title: "Refund Policy",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        Due to the nature of digital goods, all sales are final unless otherwise specified.
                        Refunds may be issued at our sole discretion in exceptional circumstances.
                      </p>
                      <p className="text-gray-700">
                        To request a refund, please contact our support team within 7 days of purchase with detailed
                        reasons for your request.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaBan className="text-purple-600" />,
                  title: "Prohibited Uses",
                  content: (
                    <div className="space-y-4">
                      <p className="text-gray-700">You may not use our service:</p>
                      <ul className="space-y-3 text-gray-700">
                        {[
                          "For any unlawful purpose or to promote illegal activities",
                          "To violate any intellectual property rights",
                          "To distribute malware, viruses, or harmful content",
                          "To engage in fraudulent activities",
                          "To interfere with the service's operation",
                          "To harass, abuse, or harm others",
                          "To collect or track personal information of others",
                          "To spam, phish, or engage in unethical marketing"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                },
                {
                  icon: <FaExclamationTriangle className="text-purple-600" />,
                  title: "Limitation of Liability",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        In no event shall Digital Goods Marketplace be liable for any indirect, incidental,
                        special or consequential damages arising out of or in connection with your use of our
                        services.
                      </p>
                      <p className="text-gray-700">
                        Our total liability for any claim arising under these terms shall not exceed the amount
                        you paid us to use the applicable service(s).
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaGavel className="text-purple-600" />,
                  title: "Changes to Terms",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        We reserve the right to modify these terms at any time. Your continued use of the
                        service after changes constitutes acceptance of the new terms.
                      </p>
                      <p className="text-gray-700">
                        We will notify you of any changes by posting the new Terms and Conditions on this page
                        and updating the "Last updated" date.
                      </p>
                    </>
                  )
                },
                {
                  icon: <FaBalanceScale className="text-purple-600" />,
                  title: "Governing Law",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">
                        These terms shall be governed by and construed in accordance with the laws of the
                        State of Delaware, without regard to its conflict of law provisions.
                      </p>
                      <p className="text-gray-700">
                        Any disputes relating to these terms will be subject to the exclusive jurisdiction
                        of the courts of Delaware.
                      </p>
                    </>
                  )
                },
                {
                  title: "Contact Information",
                  content: (
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <p className="text-gray-700">
                        Questions about these terms should be sent to us at{" "}
                        <a href="mailto:amiteshkushwaha2020@gmail.com" className="text-purple-600 font-medium hover:underline">
                          amiteshkushwaha2020@gmail.com
                        </a>.
                      </p>
                      <p className="text-gray-700 mt-3">
                        For urgent matters, please include "URGENT" in your subject line.
                      </p>
                    </div>
                  )
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  className="p-8 sm:p-10"
                >
                  <div className="flex items-start">
                    {section.icon && (
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                        {section.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.icon ? `${index + 1}. ${section.title}` : section.title}
                      </h2>
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Acceptance Footer */}
            <motion.div
              variants={sectionVariants}
              className="p-8 sm:p-10 bg-gradient-to-r from-blue-800 to-indigo-700 text-white text-center"
            >
              <h3 className="text-xl font-bold mb-4">
                Thank you for reviewing our Terms and Conditions
              </h3>
              <p className="max-w-2xl mx-auto opacity-90">
                By using our services, you acknowledge that you have read, understood, and agree to be bound
                by these terms. We recommend checking this page periodically for updates.
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

export default Terms;