const Footer = () => {
  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-4">keyXchange</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <p className="font-medium">Zepto Marketplace Private Limited</p>
          <p className="text-gray-600">Home</p>
          <p className="text-gray-600">Delivery Areas</p>
          <p className="text-gray-600">Careers</p>
          <p className="text-gray-600">Customer Support</p>
          <p className="text-gray-600">Press</p>
          <p className="text-gray-600">Mojo - a Zerato Bloor</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">Privacy Policy</p>
          <p className="text-gray-600">Terms of Use</p>
          <p className="text-gray-600">Responsible Disclosure Policy</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Download App</p>
          <p className="text-gray-600">Get it on play store</p>
          <p className="text-gray-600">Get it on app store</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;