import React from 'react';
import { ShoppingCartIcon, BoltIcon, TruckIcon } from '@heroicons/react/24/solid';

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Products",
      description: "Choose from thousands of products across various categories.",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Place Your Order",
      description: "Add items to cart and enjoy the best offers available.",
      icon: <BoltIcon className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Fast Delivery",
      description: "Experience quick delivery with items arriving promptly.",
      icon: <TruckIcon className="h-6 w-6" />,
      color: "bg-green-100 text-green-700"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 py-6 sm:px-6 lg:px-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          How It Works
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-lg mx-auto">
          Get your favorite products in just a few simple steps
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${step.color} mb-4`}>
                {step.icon}
              </div>
              <span className="absolute -top-3 -left-3 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                {index + 1}
              </span>
            </div>
            
            <div className="flex-grow text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="md:hidden mt-6 mb-2 flex justify-center">
                <div className="w-16 h-px bg-gray-200"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;