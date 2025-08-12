import React from 'react';
import { MagnifyingGlassIcon, EyeIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';

const HowToBuy = ({ product }) => {
  const steps = [
    {
      icon: <MagnifyingGlassIcon className="h-5 w-5 text-purple-600" />,
      text: `Search/Filter for "${product.category}" or "${product.company}" on the keyXchange website through the relevant category and company section.`
    },
    {
      icon: <EyeIcon className="h-5 w-5 text-purple-600" />,
      text: `View your expected/relevant product, price, and available options.`
    },
    {
      icon: <ShoppingCartIcon className="h-5 w-5 text-purple-600" />,
      text: `Proceed to buy online with secure and flexible payment options.`
    },
    {
      icon: <TruckIcon className="h-5 w-5 text-purple-600" />,
      text: `Get your product delivered quickly with keyXchange's trusted delivery network.`
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How to Buy this {product.category} Online
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center rounded-full bg-purple-100 p-2">
              {step.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800">Step {index + 1}</p>
              <p className="text-gray-600 mt-1 text-sm">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToBuy; 