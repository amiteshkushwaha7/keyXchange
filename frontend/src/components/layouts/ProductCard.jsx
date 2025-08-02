const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.company}</p>
      <p className="text-green-600 font-semibold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
