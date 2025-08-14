import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl text-center max-w-md w-full mx-4 border border-gray-100 transform transition-all hover:shadow-2xl hover:-translate-y-1">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full animate-pulse">
            <LockClosedIcon className="h-16 w-16 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-sans">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          You don't have permission to access this page.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          >
            Go to Homepage
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;