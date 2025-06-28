import { Menu, Bell, Search, User } from "lucide-react";

const AdminHeader = ({ setSidebarOpen }) => {
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

          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
