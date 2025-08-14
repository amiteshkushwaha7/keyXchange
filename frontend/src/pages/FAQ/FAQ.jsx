import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMail } from 'react-icons/fi';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I purchase a digital product?',
      answer: 'Simply browse our marketplace, select the product you want, and proceed to checkout. After payment, you\'ll receive immediate access to your purchase.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and cryptocurrency through our secure payment processor.'
    },
    {
      question: 'Can I get a refund for a digital product?',
      answer: 'Due to the nature of digital goods, all sales are final. However, we may issue refunds in exceptional circumstances at our discretion.'
    },
    {
      question: 'How do I access my purchased items?',
      answer: 'After purchase, you\'ll receive an email with download links or access instructions. You can also access your purchases anytime from your account dashboard.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption and never store your full payment details on our servers.'
    },
    {
      question: 'Can I sell my own digital products on your platform?',
      answer: 'Absolutely! We welcome digital creators. Visit our Seller Center to learn how to get started.'
    },
    {
      question: 'What if I have issues with a product I purchased?',
      answer: 'Contact our support team with your order details, and we\'ll help resolve any issues with the seller.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team 24/7 through the contact form on our website or by emailing support@digitalgoods.example.'
    }
  ];

  return (
    <>
      <title>FAQ | Digital Goods Marketplace</title>
      <meta name="description" content="Frequently asked questions" />

      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Can't find what you're looking for?{' '}
              <a 
                href="/contact" 
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition"
              >
                Contact our team
              </a>
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <motion.button
                  whileHover={{ backgroundColor: '#faf5ff' }}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <FiChevronDown 
                    className={`h-5 w-5 text-purple-600 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  />
                </motion.button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center"
          >
            <div className="flex justify-center text-purple-600 mb-4">
              <FiMail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our support team is happy to help!</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;