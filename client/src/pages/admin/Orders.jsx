import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import getStatusColor from "../../utils/statusColor.js";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/admin/order-slice/getOrder.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_API_URL } from "../../config/apiConfig.js";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(
    (state) => state.getOrders
  );
  console.log(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true)
  );
  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axios.patch(
        `${BASE_API_URL}/admin/changestatus`,
        { orderId, orderStatus: status },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success("order status changed");
        return dispatch(getOrders());
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div className="space-y-6">
      <Toaster />
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Orders
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track all your store orders
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by email"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="pending">Pending</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-3 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.products
                      .map((p) => `${p.name}`)
                      .join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                      defaultValue={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="processing">
                        processing
                      </option>
                      <option value="completed">
                        completed
                      </option>{" "}
                      <option value="pending">
                        pending
                      </option>
                      <option value="shipped">
                        shipped
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
