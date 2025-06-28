import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  X,
  Store,
  Box,
} from "lucide-react";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: Box,
      label: "AddProducts",
      path: "/admin/addproduct",
    },
    {
      icon: Package,
      label: "Products",
      path: "/admin/products",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      path: "/admin/orders",
    },
    {
      icon: Users,
      label: "Customers",
      path: "/admin/customers",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/admin/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Store className="w-8 h-8 text-blue-600 mr-3" />
            <Link
              to="/admin/dashboard"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              ECOM Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <Store className="w-8 h-8 text-blue-600 mr-3" />
              <Link
                to="/admin/dashboard"
                className="text-xl font-bold text-gray-900"
                onClick={() => setSidebarOpen(false)}
              >
                Shop Admin
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
