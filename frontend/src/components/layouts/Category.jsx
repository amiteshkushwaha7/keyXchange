import { motion } from 'framer-motion';

const Category = () => {
  const categories = [
    {
      title: "Discount & Purchase",
      items: ["Coupons", "Vouchers", "Promo Codes", "Gift Cards", "Loyalty Points"]
    },
    {
      title: "Digital Access",
      items: ["Subscription Codes", "Membership Passes", "Course Access", "Season Passes", "E-learning Licenses"]
    },
    {
      title: "Digital Content",
      items: ["E-books", "Audiobooks", "Music Albums", "Movies & TV", "Stock Images"]
    },
    {
      title: "Software & Gaming",
      items: ["Software Keys", "Plugins & Themes", "Game Keys", "In-Game Currency", "Battle Passes"]
    },
    {
      title: "Events & Assets",
      items: ["E-Tickets", "Event Access Codes", "Cryptocurrency Keys", "NFTs", "Digital Bonds"]
    }
  ];

  return (
    <div className="bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <p className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                {category.title}
              </p>
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <motion.p
                    key={i}
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer transition-colors duration-200"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Category;