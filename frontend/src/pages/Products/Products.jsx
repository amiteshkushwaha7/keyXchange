import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllProducts } from '../../features/admin/adminSlice';
import { FaStar, FaRegStar, FaBookmark } from 'react-icons/fa';
import HowItWorks from '../../components/layouts/HowItWorks';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
 
  const handleDetailsClick = (product) => {
    navigate(`/products/${product._id}`, {
      state: { product }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace(/,/g, '');
  };

  const ProductCard = ({ product, handleDetailsClick }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
      >
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.images?.[0]?.url || '/placeholder-product.png'}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Product Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Company Info */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                <img
                  src={'/company/giva.jpeg'}
                  alt={product.company || 'Company logo'}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-company.png';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {product.company || 'Unknown'}
              </span>
            </div>
            <button
              className="text-gray-400 hover:text-purple-600 p-1 rounded-full transition-colors duration-200"
              aria-label="Save product"
            >
              <FaBookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-4 flex-grow">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">
              {product.title}
            </h3>
            {product.subtitle && (
              <h4 className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.subtitle}
              </h4>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? 
                      <FaStar key={i} className="text-yellow-400 text-xs" /> : 
                      <FaRegStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                </div>
                <span className="text-gray-700 text-xs ml-1">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                product.category,
                product.isOneTimeUse ? "One Time Use" : "Multiuse",
                `Expires: ${formatDate(product.expiryDate)}`
              ].filter(Boolean).map((tag, i) => (
                <span 
                  key={i}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs font-semibold text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-xl font-bold text-purple-700">
              ₹{product.price?.toLocaleString() || '0'}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDetailsClick(product)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
              aria-label={`View details for ${product.title}`}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Filter products to show only active/not sold products
  const activeProducts = products.filter(product => 
    product.isActive && !product.isSold && product.usageLimit > 0
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Products</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    handleDetailsClick={handleDetailsClick}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <HowItWorks />
      </div>
    </div>
  );
};

export default Products;