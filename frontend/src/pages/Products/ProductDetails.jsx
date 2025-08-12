import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaExchangeAlt, FaShippingFast, FaStar, FaRegStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import OrderButton from '../Order/OrderButton';
import SimilarProducts from './SimilarProducts';
import HowToBuy from './HowToBuy';

const TABS = [
  { key: 'details', label: 'Product Details' },
  { key: 'howToRedeem', label: 'How to Redeem' },
  { key: 'tnc', label: 'Terms & Conditions' }
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const ProductDetails = () => {
  const { state } = useLocation();
  const { product, similarProducts } = state || {};
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
          <p className="text-gray-500 mt-2">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    const contentMap = {
      details: product.details,
      howToRedeem: product.howToRedeem,
      tnc: product.termsAndConditions
    };

    const content = contentMap[activeTab] || [];
    const defaultMessage = "Not specified by seller.";

    return (
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-gray-700 leading-relaxed"
      >
        {content?.length > 0 ? (
          <ul className="space-y-3">
            {content.map((step, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">{defaultMessage}</p>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Product Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Image Gallery Section */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div className="relative w-full h-80 sm:h-96 bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images?.[selectedImage]?.url || '/placeholder-product.png'}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="object-contain w-full h-full"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto py-2 px-1">
                {product.images.map((img, index) => (
                  <button
                    key={img.public_id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === index ? 'ring-2 ring-purple-600 ring-offset-2' : 'opacity-80 hover:opacity-100'}`}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Order Button */}
            <div className="mt-6">
              <OrderButton product={product} />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                  {product.subtitle && (
                    <h2 className="text-xl text-gray-600 mt-1">{product.subtitle}</h2>
                  )}
                </div>
              </div>

              {/* Price and Rating */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-purple-700">₹{product.price}</span>
                {product.rating && (
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(product.rating) ? 
                        <FaStar key={i} className="text-yellow-400 ml-1" /> : 
                        <FaRegStar key={i} className="text-yellow-400 ml-1" />
                    ))}
                    <span className="text-gray-700 ml-2 text-sm font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery and Return Info */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                  <FaShippingFast className="text-purple-600" />
                  <span className="font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                  <FaExchangeAlt className="text-purple-600" />
                  <span className="font-medium">No Return Policy</span>
                </div>
              </div>

              {/* Product Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  product.category,
                  product.company,
                  product.isOneTimeUse ? "One Time Use" : "Multiuse",
                  `Expires: ${new Date(product.expiryDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }).replace(/,/g, '')}`
                ].filter(Boolean).map((tag, i) => (
                  <span 
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative py-3 px-6 font-medium text-sm transition-colors ${activeTab === tab.key ? "text-purple-600" : "text-gray-500 hover:text-purple-500"}`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div 
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 rounded-lg bg-gray-50 min-h-[200px]">
              <AnimatePresence mode="wait">
                {renderTabContent()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Similar Products Section */}
        <SimilarProducts productId={product._id} />

        {/* How to Buy Section */}
        <HowToBuy product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;