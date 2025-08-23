import React, { useState } from 'react';
import { 
  ExclamationCircleIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const BugReportComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'bug',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Bug report submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      issueType: 'bug',
      message: ''
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      {/* {!isOpen && (
        <button
          onClick={toggleWidget}
          className="flex items-center justify-center w-14 h-14 bg-purple-700 rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-purple-900/30"
          aria-label="Report an issue"
        >
          <ExclamationCircleIcon className="w-7 h-7 text-white" />
        </button>
      )} */}
      {!isOpen && (
        <button
          onClick={toggleWidget}
          className="cursor-pointer bg-purple-700 text-white p-2 rounded-xl shadow-lg hover:bg-white hover:text-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-purple-900/30"
          aria-label="Report an issue"
        >
          Report an Issue
        </button>
      )}

      {/* Expanded widget */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl w-80 overflow-hidden border border-purple-100">
          {/* Header */}
          <div className="flex justify-between items-center bg-purple-700 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center">
              <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              Report an Issue
            </h3>
            <button
              onClick={toggleWidget}
              className="text-white hover:text-purple-200 transition-colors p-1 rounded-full hover:bg-purple-600"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <PaperAirplaneIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 text-sm">Your feedback has been received. We'll review it shortly.</p>
                <button
                  onClick={toggleWidget}
                  className="mt-4 text-purple-700 hover:text-purple-800 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type
                  </label>
                  <select
                    id="issueType"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  >
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Feature Suggestion</option>
                    <option value="ui-issue">UI/UX Issue</option>
                    <option value="content">Content Error</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Please describe the issue or suggestion in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center font-medium shadow-sm"
                >
                  <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                  Submit Report
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-purple-50 px-4 py-3 text-xs text-purple-700 flex items-center justify-center border-t border-purple-100">
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
            We value your feedback 💜
          </div>
        </div>
      )}
    </div>
  );
};

export default BugReportComponent;