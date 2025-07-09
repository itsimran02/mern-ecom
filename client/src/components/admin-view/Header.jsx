import { Menu, Bell, Search, User } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  searchProducts,
  setSearchKeyword,
} from "../../store/product-slice/searchProducts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_API_URL } from "../../config/apiConfig";
import toast from "react-hot-toast";
import axios from "axios";

const AdminHeader = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const disptach = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res?.data?.message);
        window.location.href = "/auth/login";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const searchHandler = (e) => {
    const query = e.target.value;
    disptach(setSearchKeyword(query));
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 lg:w-80">
            <Search
              size={16}
              className="text-gray-500 mr-2"
            />
            <input
              onChange={(e) => searchHandler(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  disptach(searchProducts());
                  navigate("/admin/products");
                }
              }}
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden">
            <Search size={20} />
          </button>

          {/* Profile */}
          <div className="flex justify-center flex-col items-center gap-2 ">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              onClick={() => setIsOpen((state) => !state)}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                Admin
              </span>
            </div>
            {isOpen && (
              <div className="transition-all ease-in duration-150">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
