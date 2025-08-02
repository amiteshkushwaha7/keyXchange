import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const StatCard = ({ title, value, icon, trend, trendLabel }) => {
  const isPositive = trend >= 0; 

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`mt-4 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowUpIcon className="h-5 w-5" />
        ) : (
          <ArrowDownIcon className="h-5 w-5" />
        )}
        <span className="ml-2 text-sm font-medium">
          {Math.abs(trend)}% {trendLabel}
        </span>
      </div>
    </div>
  );
};

export default StatCard;