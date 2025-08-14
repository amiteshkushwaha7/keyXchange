import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { getSimilarProducts, clearSimilarProducts } from '../../features/products/productSlice';

const SimilarProducts = ({ productId }) => {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { similarProducts, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (productId) {
            dispatch(getSimilarProducts(productId));
        }

        return () => {
            dispatch(clearSimilarProducts());
        };
    }, [productId, dispatch]);

    if (loading) return (
        <div className="mt-12 text-center text-gray-600">
            Loading similar products...
        </div>
    );
    
    if (!similarProducts || similarProducts.length === 0) return null;

    const handleDetailsClick = (product) => {
        navigate(`/products/${product._id}`, {
            state: { product }
        });
    };

    // Filter similar products by company
    const similarByCompany = similarProducts.data?.ProductsByCompany || [];
    const similarByCategory = similarProducts.data?.ProductsByCategory || [];

    const ProductCard = ({ product }) => (
        <motion.div 
            whileHover={{ y: -5 }}
            className="w-72 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img
                    src={product.images?.[0]?.url || '/placeholder-product.png'}
                    alt={product.title}
                    className="object-contain h-full"
                />
            </div>
            <div className="p-5">
                <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">{product.title}</h3>
                
                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center mb-2">
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
                
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <span className="font-bold text-purple-700">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDetailsClick(product)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
                    >
                        Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="mt-12 space-y-10">
            {/* Similar Products by Company */}
            {similarByCompany.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {similarByCompany[0].company}</h2>
                    <div className="relative">
                        <div className="overflow-x-auto pb-6">
                            <div className="flex space-x-6 w-max">
                                {similarByCompany.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Similar Products by Category */}
            {similarByCategory.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {similarByCategory[0].category}</h2>
                    <div className="relative">
                        <div className="overflow-x-auto pb-6">
                            <div className="flex space-x-6 w-max">
                                {similarByCategory.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SimilarProducts;