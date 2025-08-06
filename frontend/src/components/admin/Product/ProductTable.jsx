import { useState } from 'react';
import StatusBadge from '../Common/StatusBadge';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleImageClick = (url) => {
    setFullImageUrl(url);
    setShowImageModal(true);
  };

  const renderArrayField = (items) => {
    if (!items || items.length === 0) return 'N/A';
    return (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-900">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative bg-white rounded shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowImageModal(false)}
            >
              &times;
            </button>
            <img
              src={fullImageUrl}
              alt="Full Product"
              className="max-h-[80vh] max-w-[90vw] rounded"
            />
          </div>
        </div>
      )}

      {/* Product List Table */}
      <div className={`${isDetailOpen ? 'hidden md:block md:w-1/2' : 'w-full'} bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usage Limit</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${selectedProduct?._id === product._id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleRowClick(product)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="h-10 w-10 rounded-md object-cover border border-gray-200 cursor-zoom-in"
                        onClick={e => {
                          e.stopPropagation();
                          handleImageClick(product.images[0].url);
                        }}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                      {typeof product.price === 'number'
                        ? `₹${product.price.toFixed(2)}`
                        : 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{product.usageLimit}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={product.isActive ? 'active' : 'inactive'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 bg-gray-50">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
          </div>
        )}
      </div> 

      {/* Product Detail Panel */}
      {isDetailOpen && selectedProduct && (
        <div className={`${isDetailOpen ? 'w-full md:w-1/2' : 'hidden'} bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h2>
              <button
                onClick={closeDetail}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {selectedProduct.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-full rounded-md object-cover border border-gray-200 cursor-zoom-in"
                    onClick={() => handleImageClick(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subtitle</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.subtitle || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Product Code</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.code}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.company}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Details</h3>
                {renderArrayField(selectedProduct.details)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1 text-sm text-gray-900">₹{selectedProduct.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Usage Limit</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.usageLimit}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProduct.expiryDate ? new Date(selectedProduct.expiryDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
 
              <div>
                <h3 className="text-sm font-medium text-gray-500">How To Redeem</h3>
                {renderArrayField(selectedProduct.howToRedeem)}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Terms & Conditions</h3>
                {renderArrayField(selectedProduct.termsAndConditions)}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedProduct.createdAt ? new Date(selectedProduct.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedProduct.updatedAt ? new Date(selectedProduct.updatedAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Uploaded By</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedProduct.uploadedBy?.name || selectedProduct.uploadedBy?.email || selectedProduct.uploadedBy || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Active</h3>
                  <StatusBadge status={selectedProduct.isActive ? 'active' : 'inactive'} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">One Time Use</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.isOneTimeUse ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sold</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProduct.isSold ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    closeDetail();
                    onEdit(selectedProduct._id);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product?')) {
                      closeDetail();
                      onDelete(selectedProduct._id);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;