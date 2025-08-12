import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Open the app",
      description: "Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more"
    },
    {
      title: "Place an order",
      description: "Add your favourite items to the cart & avail the best offers"
    },
    {
      title: "Get free delivery",
      description: "Experience lighting-fast speed & get all your items delivered in 10 minutes"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default HowItWorks;