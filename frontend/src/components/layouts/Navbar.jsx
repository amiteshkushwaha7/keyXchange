import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">DigitalGoods</Link>
      <div className="space-x-4">
        <Link to="/products">Products</Link>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/account">Profile</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
