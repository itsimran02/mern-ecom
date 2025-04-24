import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className=" px-3 py-4 md:px-6 ">
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <div className="font-bold text-xl md:text-2xl">
            SHOP.CO
          </div>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden lg:block">
          <ul className="flex space-x-8">
            <Link
              to="/shop/products"
              className="text-gray-800 hover:text-black font-medium cursor-pointer"
            >
              Shop
            </Link>
            <li className="text-gray-800 hover:text-black font-medium cursor-pointer">
              On Sale
            </li>
            <li className="text-gray-800 hover:text-black font-medium cursor-pointer">
              New Arrivals
            </li>
            <li className="text-gray-800 hover:text-black font-medium cursor-pointer">
              Brands
            </li>
          </ul>
        </div>

        {/* Desktop Search bar */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <Search
            size={18}
            className="absolute left-3 text-gray-500"
          />
        </div>

        {/* Icons and Mobile Menu Button */}

        <div className="flex items-center space-x-4">
          {/* Search Icon (Mobile) */}

          <button
            onClick={toggleSearch}
            className="lg:hidden text-gray-700 cursor-pointer"
          >
            <Search size={22} />
          </button>

          <ShoppingCart
            className="text-gray-700 cursor-pointer"
            size={22}
          />
          <User
            className="text-gray-700 cursor-pointer"
            size={22}
          />

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-600 focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden mt-4">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Search
              size={18}
              className="absolute left-3 text-gray-500"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            <Link className="text-gray-800 hover:font-bold transition-all ease-in duration-75 ">
              Shop
            </Link>
            <Link className="text-gray-800 hover:font-bold transition-all ease-in duration-75">
              On Sale
            </Link>
            <Link className="text-gray-800 hover:font-bold transition-all ease-in duration-75">
              New Arrivals
            </Link>
            <Link className="text-gray-800 hover:font-bold transition-all ease-in duration-75">
              Brands
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
