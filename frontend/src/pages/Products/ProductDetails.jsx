import { useLocation } from 'react-router-dom';
import OrderButton from '../Order/OrderButton';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const TABS = [
  { key: 'details', label: 'Product Details' },
  { key: 'howToUse', label: 'How to Use' },
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
            {product.description && product.description ? product.description : "Not specified by seller."}
          </div>
        );
      case 'howToUse':
        return (
          <div className="text-gray-700 leading-relaxed">
            {product.howToUse && product.howToUse.trim() ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.howToUse.split('\n').map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : "Not specified by seller."}
          </div>
        );
      case 'howToRedeem':
        return (
          <div className="text-gray-700 leading-relaxed">
            {product.howToRedeem && product.howToRedeem.trim() ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.howToRedeem.split('\n').map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : "Not specified by seller."}
          </div>
        );
      case 'tnc':
        return (
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {product.termsAndConditions && product.termsAndConditions.trim() ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.termsAndConditions.split('\n').map((term, i) => (
                  <li key={i}>{term}</li>
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
                  <span className="text-gray-500 text-sm">{product.company}</span>
                </div>
                {product.rating && (
                  <div className="flex items-center bg-purple-100 px-2 py-1 rounded">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="ml-2 text-sm font-medium text-green-600">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {product.company}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {product.isOneTimeUse ? "One Time Use" : "Multiuse"}
                </span>
                {product.isSold && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
              
              <div className="mt-4">
                <OrderButton product={product} />
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
        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <div key={similarProduct._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={similarProduct.images?.[0]?.url || '/placeholder-product.png'}
                      alt={similarProduct.title}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{similarProduct.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{similarProduct.company}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-gray-900">₹{similarProduct.price}</span>
                      {similarProduct.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">₹{similarProduct.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-3">
                      <OrderButton product={similarProduct} small />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;