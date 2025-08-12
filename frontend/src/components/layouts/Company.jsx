// Company.jsx
const Company = () => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Company</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <p className="font-medium">About Us</p>
          <p className="text-gray-600">Our Story</p>
          <p className="text-gray-600">Leadership</p>
          <p className="text-gray-600">Careers</p>
          <p className="text-gray-600">Press Center</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Services</p>
          <p className="text-gray-600">Fast Delivery</p>
          <p className="text-gray-600">Zepto Pass</p>
          <p className="text-gray-600">Zepto Cafe</p>
          <p className="text-gray-600">Bulk Orders</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Legal</p>
          <p className="text-gray-600">Terms of Use</p>
          <p className="text-gray-600">Privacy Policy</p>
          <p className="text-gray-600">Security</p>
          <p className="text-gray-600">Compliance</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Partners</p>
          <p className="text-gray-600">Sell on Zepto</p>
          <p className="text-gray-600">Advertise</p>
          <p className="text-gray-600">Affiliate Program</p>
          <p className="text-gray-600">API Access</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Contact</p>
          <p className="text-gray-600">Help Center</p>
          <p className="text-gray-600">Live Chat</p>
          <p className="text-gray-600">Email Support</p>
          <p className="text-gray-600">Store Locator</p>
        </div>
      </div>
    </div>
  );
};

export default Company;