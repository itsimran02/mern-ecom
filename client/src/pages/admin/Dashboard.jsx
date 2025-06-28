import {
  ShoppingCart,
  Package,
  Users,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../store/admin/order-slice/getOrder.js";
import { useEffect } from "react";
import { getProducts } from "../../store/product-slice/getProducts.js";
import { getCustomers } from "../../store/admin/customer-slice/getCustomer.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(
    (state) => state.getOrders
  );
  console.log(orders);
  const { data: products } = useSelector(
    (state) => state.products
  );
  const { customers } = useSelector(
    (state) => state.customers
  );
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getCustomers());
  }, [getProducts, getOrders, getCustomers]);
  const stats = [
    {
      title: "Total Orders",
      value: orders?.length || 0,

      icon: ShoppingCart,
      color: "blue",
    },
    {
      title: "Products",
      value: products?.length || 0,

      icon: Package,
      color: "green",
    },
    {
      title: "Customers",
      value: customers?.length || 0,

      icon: Users,
      color: "purple",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 45,
      revenue: "$1,350",
    },
    { name: "Smart Watch", sales: 32, revenue: "$960" },
    { name: "Phone Case", sales: 28, revenue: "$420" },
    {
      name: "Bluetooth Speaker",
      sales: 21,
      revenue: "$630",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "purple":
        return "bg-purple-500";
      case "orange":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Admin!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your store today.
            </p>
          </div>
          <Link
            to="/admin/addproduct"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${getIconColor(
                    stat.color
                  )}`}
                >
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 text-sm font-medium">
                <span>View all</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart
                        size={16}
                        className="text-blue-600"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        #{index + 1}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.userName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${order.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Products
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package
                        size={14}
                        className="text-gray-600"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">
                    {product.revenue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/addproduct"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="text-blue-600" size={20} />
            <span className="font-medium text-gray-900">
              Add New Product
            </span>
          </Link>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="text-green-600" size={20} />
            <span className="font-medium text-gray-900">
              View All Orders
            </span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="text-purple-600" size={20} />
            <span className="font-medium text-gray-900">
              Manage Customers
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
