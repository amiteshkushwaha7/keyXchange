// SimilarProducts.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

    if (loading) return <div className="mt-12">Loading similar products...</div>;
    if (!similarProducts || similarProducts.length === 0) return null;

    const handleDetailsClick = (product) => {
        navigate(`/products/${product._id}`, {
            state: { product }
        });
    }; 

    // Filter similar products by company
    const similarByCompany = similarProducts.data?.ProductsByCompany || [];
    const similarByCategory = similarProducts.data?.ProductsByCategory || [];

    console.log(similarByCategory);
    console.log(similarByCompany);

    return (
        <div className="mt-12 space-y-8">
            {/* Similar Products by Company */}
            {similarByCompany.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">More from {similarByCompany[0].company}</h2>
                    <div className="relative">
                        <div className="overflow-x-auto pb-4">
                            <div className="flex space-x-4 w-max">
                                {similarByCompany.map((product) => (
                                    <div key={product._id} className="w-64 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                                            <img
                                                src={product.images?.[0]?.url || '/placeholder-product.png'}
                                                alt={product.title}
                                                className="object-contain h-full"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="font-bold text-gray-900">₹{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDetailsClick(product)}
                                                className="w-full mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Similar Products by Category */}
            {similarByCategory.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">More in {similarByCategory[0].category}</h2>
                    <div className="relative">
                        <div className="overflow-x-auto pb-4">
                            <div className="flex space-x-4 w-max">
                                {similarByCategory.map((product) => (
                                    <div key={product._id} className="w-64 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                                            <img
                                                src={product.images?.[0]?.url || '/placeholder-product.png'}
                                                alt={product.title}
                                                className="object-contain h-full"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="font-bold text-gray-900">₹{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDetailsClick(product)}
                                                className="w-full mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimilarProducts;