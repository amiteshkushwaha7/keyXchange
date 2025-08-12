import { useState } from 'react';

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
    

      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Can't find what you're looking for? <a href="/contact" className="text-blue-600 hover:text-blue-800">Contact our team</a>.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`h-6 w-6 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;