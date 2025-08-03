import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchKeyword,
  searchProducts,
} from "../../store/product-slice/searchProducts";

const Header = () => {
  const [searchField, setSearchField] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSearch = (value) => {
    if (value) {
      dispatch(setSearchKeyword(value));
      dispatch(searchProducts());
      navigate(`products/search/?keyword=${value}`);
      setSearchField("");
    }
  };

  return (
    <nav className="px-3 py-4 md:px-6 bg-white shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link
            to={"/"}
            className="font-bold text-xl md:text-2xl"
          >
            SHOP.CO
          </Link>
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

            <a
              href="#recentProducts"
              className="text-gray-800 hover:text-black font-medium cursor-pointer"
            >
              Recent Products
            </a>
            <a
              href="#topSelling"
              className="text-gray-800 hover:text-black font-medium cursor-pointer"
            >
              Top Selling
            </a>
          </ul>
        </div>

        {/* Desktop Search bar */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            placeholder="Search for products..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchField);
              }
            }}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <Search
            size={18}
            className="absolute left-3 text-gray-500 cursor-pointer"
            onClick={() => handleSearch(searchField)}
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
          <Link to="cart">
            <ShoppingCart
              className="text-gray-700 cursor-pointer"
              size={22}
            />
          </Link>
          <Link to="profile">
            <User
              className="text-gray-700 cursor-pointer"
              size={22}
            />
          </Link>
          {!user && <Link to="/auth/login">login</Link>}

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
              value={searchField}
              onChange={(e) =>
                setSearchField(e.target.value)
              }
              placeholder="Search for products..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchField);
                }
              }}
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Search
              size={18}
              className="absolute left-3 text-gray-500 cursor-pointer"
              onClick={() => handleSearch(searchField)}
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/shop/products"
              className="text-gray-800 hover:font-bold transition-all ease-in duration-75"
            >
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
