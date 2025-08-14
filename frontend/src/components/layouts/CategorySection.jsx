// CategorySection.jsx
import React from 'react';
import {
    ShoppingBagIcon,
    CakeIcon,
    BeakerIcon,
    SparklesIcon,
    FireIcon,
    IceCreamIcon,
    GiftIcon,
    ShoppingCartIcon,
    CubeIcon,
    TagIcon,
    HomeIcon,
    DeviceMobileIcon,
    StarIcon,
    LightningBoltIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const CategorySection = () => {
    // Top horizontal categories (scrollable)
    const topCategories = [
        { name: 'All', icon: StarIcon, active: true },
        { name: 'Cafe', icon: CakeIcon },
        { name: 'Home', icon: HomeIcon },
        { name: 'Toys', icon: GiftIcon },
        { name: 'Fresh', icon: ShoppingBagIcon },
        { name: 'Mobiles', icon: DeviceMobileIcon },
        { name: 'Fashion', icon: ShoppingCartIcon },
        { name: 'Electronics', icon: LightningBoltIcon },
        { name: 'Beauty', icon: HeartIcon }
    ];

    // Bottom grid categories
    const gridCategories = [
        { name: 'Fruits & Vegetables', icon: ShoppingBagIcon },
        { name: 'Atta, Rice, Oil & Dals', icon: BeakerIcon },
        { name: 'Masala & Dry Fruits', icon: FireIcon },
        { name: 'Zapto Cafe', icon: CakeIcon },
        { name: 'Sweet Cravings', icon: SparklesIcon },
        { name: 'Toys & Sports', icon: GiftIcon },
        { name: 'Apparel & Lifestyle', icon: ShoppingCartIcon },
        { name: 'Jewellery & Accessories', icon: TagIcon },
        { name: 'Frozen Food', icon: CubeIcon },
        { name: 'Ice Creams & More', icon: IceCreamIcon },
        { name: 'Packaged Food', icon: ShoppingBagIcon }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Top Horizontal Scrollable Categories */}
            <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar">
                <div className="flex space-x-3">
                    {topCategories.map((category, index) => (
                        <div
                            key={`top-${index}`}
                            className={`flex flex-col items-center justify-center p-3 min-w-[70px] rounded-lg cursor-pointer transition-colors
                ${category.active ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}
                        >
                            <div className={`w-10 h-10 flex items-center justify-center mb-1 rounded-full
                ${category.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                                <category.icon className="h-5 w-5" />
                            </div>
                            <span className={`text-xs font-medium text-center
                ${category.active ? 'text-blue-600' : 'text-gray-700'}`}>
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Grid Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {gridCategories.map((category, index) => (
                    <div
                        key={`grid-${index}`}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
                    >
                        <div className="w-12 h-12 flex items-center justify-center mb-2 rounded-full bg-gray-50 text-gray-600">
                            <category.icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium text-center text-gray-700">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default CategorySection;