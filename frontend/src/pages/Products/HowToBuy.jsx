import React from 'react';
import { MagnifyingGlassIcon, EyeIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/24/outline';

const HowToBuy = ({ product }) => {
  const steps = [
    {
      icon: <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />,
      text: `Search/Filter for "${product.category}" or "${product.company}" on the keyXchange website through the relevant category and company section.`
    },
    {
      icon: <EyeIcon className="h-6 w-6 text-blue-500" />,
      text: `View your expected/relevant product, price, available options.`
    },
    {
      icon: <ShoppingCartIcon className="h-6 w-6 text-blue-500" />,
      text: `Proceed next to buy online with secure and flexible payment options.`
    },
    {
      icon: <TruckIcon className="h-6 w-6 text-blue-500" />,
      text: `Get your product delivered quickly with keyXchange's trusted delivery network and enjoy a hassle-free experience.`
    }
  ];

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        How to Buy this {product.category} Online on keyXchange
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Follow these simple steps to get your product delivered to your doorstep:
      </p>
      
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-blue-100 p-2">
              {step.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800">Step {index + 1}</p>
              <p className="text-gray-600 mt-1">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HowToBuy;