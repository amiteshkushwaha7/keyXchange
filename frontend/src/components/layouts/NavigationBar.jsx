import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ShoppingCartIcon,
  UserIcon
} from "@heroicons/react/24/outline";

function NavigationBar() {
  const [flag, setFlag] = useState(true);
  const [home, setHome] = useState(false);
  const [categories, setCategories] = useState(false);
  const [newUpload, setNewUpload] = useState(false);
  const [cart, setCart] = useState(false);
  const [account, setAccount] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // Route-based highlight
  useEffect(() => {
    if (location.pathname === "/") setActiveSection("home");
    else if (location.pathname === "/categories") setActiveSection("categories");
    else if (location.pathname === "/new") setActiveSection("new");
    else if (location.pathname === "/cart") setActiveSection("cart");
    else if (location.pathname === "/account") setActiveSection("account");
  }, [location.pathname]);

  const handleFlagClick = () => {
    setFlag((prev) => !prev);
  };

  return (
    <section className="flex flex-col justify-center items-center fixed bottom-10 left-0 right-0 z-20">
      <div className="z-10 mb-1">
        {/* Tooltips */}
        {home && <div className="bg-green-500 text-white px-2 rounded-full">Home</div>}
        {categories && <div className="bg-green-500 text-white px-2 rounded-full">Categories</div>}
        {newUpload && <div className="bg-green-500 text-white px-2 rounded-full">New</div>}
        {cart && <div className="bg-green-500 text-white px-2 rounded-full">Cart</div>}
        {account && <div className="bg-green-500 text-white px-2 rounded-full">Account</div>}
      </div>
      
      {flag ? (
        <div className="flex justify-center items-center z-10">
          <div className="flex justify-around items-center gap-4 p-4 px-6 bg-white rounded-full shadow-lg border border-gray-100">
            <Link 
              to="/" 
              onMouseOver={() => setHome(true)} 
              onMouseOut={() => setHome(false)}
              className="relative"
            >
              <HomeIcon 
                className={`w-6 h-6 p-1 rounded-full cursor-pointer hover:text-green-600 ${
                  activeSection === "home" ? "text-green-600" : "text-gray-600"
                }`}
              />
              {activeSection === "home" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to="/categories" 
              onMouseOver={() => setCategories(true)} 
              onMouseOut={() => setCategories(false)}
              className="relative"
            >
              <Squares2X2Icon 
                className={`w-6 h-6 p-1 rounded-full cursor-pointer hover:text-green-600 ${
                  activeSection === "categories" ? "text-green-600" : "text-gray-600"
                }`}
              />
              {activeSection === "categories" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to="/new" 
              onMouseOver={() => setNewUpload(true)} 
              onMouseOut={() => setNewUpload(false)}
              className="relative"
            >
              <PlusCircleIcon 
                className={`w-8 h-8 p-1 rounded-full cursor-pointer hover:text-green-600 ${
                  activeSection === "new" ? "text-green-600" : "text-gray-600"
                }`}
              />
              {activeSection === "new" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to="/cart" 
              onMouseOver={() => setCart(true)} 
              onMouseOut={() => setCart(false)}
              className="relative"
            >
              <div className="relative">
                <ShoppingCartIcon 
                  className={`w-6 h-6 p-1 rounded-full cursor-pointer hover:text-green-600 ${
                    activeSection === "cart" ? "text-green-600" : "text-gray-600"
                  }`}
                />
                {/* Cart badge */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              {activeSection === "cart" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to="/account" 
              onMouseOver={() => setAccount(true)} 
              onMouseOut={() => setAccount(false)}
              className="relative"
            >
              <UserIcon 
                className={`w-6 h-6 p-1 rounded-full cursor-pointer hover:text-green-600 ${
                  activeSection === "account" ? "text-green-600" : "text-gray-600"
                }`}
              />
              {activeSection === "account" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></span>
              )}
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="bg-white rounded-full cursor-pointer z-10 animate-bounce p-2 shadow-lg"
          onClick={handleFlagClick}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-green-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      )}
    </section>
  );
}

export default NavigationBar;