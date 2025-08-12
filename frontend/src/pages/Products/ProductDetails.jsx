import { useLocation } from 'react-router-dom';
import OrderButton from '../Order/OrderButton';
import { useState } from 'react';
import { FaExchangeAlt, FaShippingFast } from 'react-icons/fa';
import SimilarProducts from './SimilarProducts'; 
import HowToBuy from './HowToBuy'; 

const TABS = [
  { key: 'details', label: 'Details' },
  { key: 'howToRedeem', label: 'How to Redeem' },
  { key: 'tnc', label: 'Terms & Conditions' }
];

const ProductDetails = () => {
  const { state } = useLocation();
  const { product, similarProducts } = state || {};
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product)
    return <div className="container mx-auto p-4">Product not found</div>;

  // Tab panel content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="text-gray-700 leading-relaxed">
            {product.details && product.details.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.details.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : "Not specified by seller."}
          </div>
        );
      case 'howToRedeem':
        return (
          <div className="text-gray-700 leading-relaxed">
            {product.howToRedeem && product.howToRedeem.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.howToRedeem.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : "Not specified by seller."}
          </div>
        );
      case 'tnc':
        return (
          <div className="text-gray-700 leading-relaxed">
            {product.termsAndConditions && product.howToRedeem.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.termsAndConditions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : "Not specified by seller."}
          </div>
        );
      default:
        return null;
    }
  };

  return ( 
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
          {/* LEFT: IMAGE */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div className="w-full h-80 sm:h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-4">
              <img
                src={product.images?.[selectedImage]?.url || '/placeholder-product.png'}
                alt={product.title}
                className="object-contain w-full h-full transition duration-300 transform hover:scale-105"
              />
            </div>
            <div>
              <OrderButton product={product} />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto py-2">
                {product.images.map((img, index) => (
                  <button
                    key={img.public_id}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded border-2 ${selectedImage === index ? 'border-purple-600' : 'border-gray-200'}`}
                  >
                    <img
                      src={img.url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT CARD & TABS */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Main Info Card */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                  <h1 className="text-2xl font-bold text-gray-900">{product.subtitle}</h1>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              </div>

              {/* Delivery and Return Info */}
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaShippingFast className="text-purple-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaExchangeAlt className="text-purple-600" />
                  <span>No Return/Exchange</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-semibold">
                  {product.category}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-semibold">
                  {product.company}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-semibold">
                  {product.isOneTimeUse ? "One Time Use" : "Multiuse"}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-sm text-xs font-semibold">
                  {new Date(product.expiryDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }).replace(/,/g, '')}
                </span>
              </div>
            </div>

            {/* TABS NAV */}
            <div className="flex border-b mb-4">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 px-4 -mb-px font-medium text-sm transition ${activeTab === tab.key
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-purple-600"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TABS CONTENT */}
            <div className="p-4 rounded-b shadow-sm min-h-[200px]">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <SimilarProducts productId={product._id} />

        <HowToBuy product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;