// ProductDetails.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { state } = useLocation();
  const { product, similarProducts } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!product) 
    return <div className="container mx-auto p-4">Product not found</div>;

  const handleBuyNow = async () => {
    navigate('/orders/create', { state: { product }});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.company}</p>
          <p className="text-xl font-bold mb-4">${product.price}</p>
          <p className="mb-4">{product.description || 'No description available'}</p>

          <button
            onClick={handleBuyNow}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Buy Now
          </button>
        </div>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Similar Products</h2>
            <div className="grid gap-4">
              {similarProducts.map(similar => (
                <div key={similar._id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold">{similar.title}</h3>
                  <p className="text-sm text-gray-600">{similar.company}</p>
                  <p className="font-bold">${similar.price}</p>
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