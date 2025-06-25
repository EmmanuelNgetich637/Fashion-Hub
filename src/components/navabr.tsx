import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        FashionHub
      </Link>
      <ul className="flex space-x-4 text-gray-700">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
