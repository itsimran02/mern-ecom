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
import getStatusColor from "../../utils/statusColor.js";
import getIconColor from "../../utils/iconColor.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(
    (state) => state.getOrders
  );

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
  }, [dispatch]);
  const stats = [
    {
      title: "Total Orders",
      value: orders?.length || 0,

      icon: ShoppingCart,
      color: "blue",
      link: "/admin/orders",
    },
    {
      title: "Products",
      value: products?.length || 0,

      icon: Package,
      color: "green",
      link: "/admin/products",
    },
    {
      title: "Customers",
      value: customers?.length || 0,
      link: "/admin/customers",

      icon: Users,
      color: "purple",
    },
  ];

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
              Here&apos;s what&apos;s happening with your
              store today.
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
            <Link
              to={stat.link}
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
            </Link>
          );
        })}
      </div>

      <div className="grid">
        <div className=" bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 text-sm font-medium">
                <Link to="/admin/orders">View all</Link>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {!orders && <h2>No Orders yet</h2>}
              {orders?.slice(0, 5).map((order, index) => (
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
                      ${order.amount / 100}
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
        {/* <div className="bg-white rounded-lg shadow-sm">
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
        </div> */}
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
          <Link
            to="/admin/orders"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="text-green-600" size={20} />
            <Link
              to="/admin/orders"
              className="font-medium text-gray-900"
            >
              View All Orders
            </Link>
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="text-purple-600" size={20} />
            <span className="font-medium text-gray-900">
              Manage Customers
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
