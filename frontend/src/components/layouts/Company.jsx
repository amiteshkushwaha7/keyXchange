import { motion } from 'framer-motion';

const Company = () => {
  const sections = [
    {
      title: "About Us",
      items: ["Our Story", "Leadership", "Careers", "Press Center"]
    },
    {
      title: "Services",
      items: ["Fast Delivery", "Zepto Pass", "Zepto Cafe", "Bulk Orders"]
    },
    {
      title: "Legal",
      items: ["Terms of Use", "Privacy Policy", "Security", "Compliance"]
    },
    {
      title: "Partners",
      items: ["Sell on Zepto", "Advertise", "Affiliate Program", "API Access"]
    },
    {
      title: "Contact",
      items: ["Help Center", "Live Chat", "Email Support", "Store Locator"]
    }
  ];

  return (
    <div className="bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Company</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <p className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                {section.title}
              </p>
              <div className="space-y-3">
                {section.items.map((item, i) => (
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

export default Company;