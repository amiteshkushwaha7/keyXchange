import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../features/admin/adminSlice';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDetailsClick = (product) => {
    const similarProducts = products.filter(p =>
      p._id !== product._id &&
      (p.category === product.category || p.company === product.company)
    ).slice(0, 3);

    navigate(`/products/${product._id}`, {
      state: {
        product,
        similarProducts
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return '1 month ago';
    return `${diffInMonths} months ago`;
  };

  // const ProductCard = ({ product }) => {
  //   return (
  //     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
  //       <div className="flex flex-col gap-6">
  //         <div className="flex justify-between">
  //           <img
  //             src='../../../public/company/apple.png'
  //             alt={product.company || 'Company logo'}
  //             className="h-10 w-10 rounded-full object-cover"
  //           />
  //           <button className="text-gray-400 hover:text-gray-700 px-2 py-1 rounded-full">
  //             <span>Save</span>
  //             <BookmarkIcon className="h-5 w-5" />
  //           </button>
  //         </div>

  //         <div className="flex flex-col">
  //           {/* <p className="text-gray-500 text-sm">{product.company || 'Unknown'}</p> */}
  //           <p>
  //             <span className="text-sm mr-3">Amazon</span>
  //             <span className="text-gray-500 text-xs mb-1">{formatDate(product.createdAt)}</span>
  //           </p>
  //           {/* <p className="text-gray-500 text-xs mb-1">{formatDate(product.createdAt)}</p> */}
  //           <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
  //           <h5 className="text-lg font-semibold text-gray-900 mb-2">{product.subtitle}</h5>

  //           <div className="flex gap-2 mb-4">
  //             <span className="text-xs bg-gray-200 px-2 py-1 rounded-sm">
  //               {product.category}
  //             </span>
  //             <span className="text-xs bg-gray-200 px-2 py-1 rounded-sm">
  //               {product.isOneTimeUse ? 'One-Time-Use' : 'Reusable'}
  //             </span>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="flex justify-between items-center pt-6 mt-12 border-t border-gray-200">
  //         <div className="text-lg font-bold text-gray-900">₹{product.price}</div>
  //         <button
  //           onClick={() => handleDetailsClick(product)}
  //           className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
  //         >
  //           Details
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  const ProductCard = ({ product, handleDetailsClick }) => {
    return (
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        <div className="flex flex-col gap-4 sm:gap-6 flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-100 border border-gray-200 p-1.5">
                <img
                  src={'../../../public/company/giva.jpeg'}
                  alt={product.company || 'Company logo'}
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '../../../public/company/apple.png';
                  }}
                />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">{product.company || 'Amazon'}</span>
                <p className="text-gray-500 text-xs">{formatDate(product.createdAt)}</p>
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors duration-200"
              aria-label="Save product"
            >
              <BookmarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
              {product.title}
            </h3>
            {product.subtitle && (
              <h4 className="text-sm sm:text-base text-gray-600 line-clamp-2">
                {product.subtitle}
              </h4>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {product.category && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                  {product.category}
                </span>
              )}
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                {product.isOneTimeUse ? 'One-Time-Use' : 'Reusable'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 sm:pt-6 sm:mt-6 border-t border-gray-200">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            ₹{product.price?.toLocaleString() || '0'}
          </div>
          <button
            onClick={() => handleDetailsClick(product)}
            className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            aria-label={`View details for ${product.title}`}
          >
            Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleDetailsClick={handleDetailsClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;