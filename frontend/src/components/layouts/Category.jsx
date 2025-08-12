// Category.jsx
const Category = () => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <p className="font-medium">Fruits & Vegetables</p>
          <p className="text-gray-600">Baby Food</p>
          <p className="text-gray-600">Breakfast & Sauces</p>
          <p className="text-gray-600">Cleaning Essentials</p>
          <p className="text-gray-600">Homegrown Brands</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Atta, Rice, Oil & Dal</p>
          <p className="text-gray-600">Dairy, Bread & Eggs</p>
          <p className="text-gray-600">Tea, Coffee & More</p>
          <p className="text-gray-600">Home Needs</p>
          <p className="text-gray-600">Paan Corner</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Masala & Dry Fruits</p>
          <p className="text-gray-600">Cold Drinks & Juices</p>
          <p className="text-gray-600">Biscuits</p>
          <p className="text-gray-600">Electricals & Accessories</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Sweet Cravings</p>
          <p className="text-gray-600">Munchies</p>
          <p className="text-gray-600">Makeup & Beauty</p>
          <p className="text-gray-600">Hygiene & Grooming</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Frozen Food & Ice Creams</p>
          <p className="text-gray-600">Meats, Fish & Eggs</p>
          <p className="text-gray-600">Bath & Body</p>
          <p className="text-gray-600">Health & Baby Care</p>
        </div>
      </div>
    </div>
  );
};

export default Category;