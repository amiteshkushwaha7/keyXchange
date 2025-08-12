// Category.jsx
const Category = () => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {/* Discount & Purchase-Related */}
        <div className="space-y-2">
          <p className="font-medium">Discount & Purchase</p>
          <p className="text-gray-600">Coupons</p>
          <p className="text-gray-600">Vouchers</p>
          <p className="text-gray-600">Promo Codes</p>
          <p className="text-gray-600">Gift Cards</p>
          <p className="text-gray-600">Loyalty Points</p>
        </div>

        {/* Digital Access & Membership */}
        <div className="space-y-2">
          <p className="font-medium">Digital Access</p>
          <p className="text-gray-600">Subscription Codes</p>
          <p className="text-gray-600">Membership Passes</p>
          <p className="text-gray-600">Course Access</p>
          <p className="text-gray-600">Season Passes</p>
          <p className="text-gray-600">E-learning Licenses</p>
        </div>

        {/* Digital Content Licenses */}
        <div className="space-y-2">
          <p className="font-medium">Digital Content</p>
          <p className="text-gray-600">E-books</p>
          <p className="text-gray-600">Audiobooks</p>
          <p className="text-gray-600">Music Albums</p>
          <p className="text-gray-600">Movies & TV</p>
          <p className="text-gray-600">Stock Images</p>
        </div>

        {/* Software & Gaming */}
        <div className="space-y-2">
          <p className="font-medium">Software & Gaming</p>
          <p className="text-gray-600">Software Keys</p>
          <p className="text-gray-600">Plugins & Themes</p>
          <p className="text-gray-600">Game Keys</p>
          <p className="text-gray-600">In-Game Currency</p>
          <p className="text-gray-600">Battle Passes</p>
        </div>

        {/* Event & Financial */}
        <div className="space-y-2">
          <p className="font-medium">Events & Assets</p>
          <p className="text-gray-600">E-Tickets</p>
          <p className="text-gray-600">Event Access Codes</p>
          <p className="text-gray-600">Cryptocurrency Keys</p>
          <p className="text-gray-600">NFTs</p>
          <p className="text-gray-600">Digital Bonds</p>
        </div>

      </div>
    </div>
  );
};

export default Category;