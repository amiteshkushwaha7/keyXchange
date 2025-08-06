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
    // Find similar products (same category or same company)
    const similarProducts = products.filter(p =>
      p._id !== product._id &&
      (p.category === product.category || p.company === product.company)
    ).slice(0, 3); // Limit to 3 similar products

    navigate(`/products/${product._id}`, {
      state: {
        product,
        similarProducts
      } 
    });
  };

  const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-md space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm text-gray-800">{product.company || 'Unknown'}</p>
            <p className="text-lg font-bold text-gray-900">{product.title}</p>
            <p className="text-xs text-gray-400">{new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-700">
            <BookmarkIcon size={16} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{product.category}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{product.isOneTimeUse ? 'One-time Use' : 'Reusable'}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{product.isActive ? 'Active' : 'Inactive'}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-sm font-semibold text-gray-800">${product.price}</div>
          <button
            onClick={() => handleDetailsClick(product)}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Details
          </button>
        </div>

        <p className="text-xs text-gray-400 pt-1">Code: {product.code}</p>

        {product.expiryDate && (
          <>
            <p className="text-xs text-red-500 pt-1">
              Expiry: {new Date(product.expiryDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <main className="col-span-1 md:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Recommended Products</h2>
            <button className="text-sm text-gray-600">Sort by: Last updated</button>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;