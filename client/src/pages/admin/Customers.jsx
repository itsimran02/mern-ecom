import {
  Users,
  Trash2,
  ShoppingCart,
  Calendar,
  MoreVertical,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomers } from "../../store/admin/customer-slice/getCustomer.js";
import { deleteCustomer } from "../../store/admin/customer-slice/deletCustomer.js";
import PopUp from "../common/PopUp.jsx";

const Customers = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const dispatch = useDispatch();
  const { customers, status } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteCustomer(customerId));
    dispatch(getCustomers());
    setIsDeleting(false);
  };
  const handleCancle = () => {
    setIsDeleting((state) => !state);
  };
  const stats = [
    {
      title: "Total Customers",
      value: customers?.length || 0,
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isDeleting && (
        <PopUp
          onCancel={handleCancle}
          onConfirm={handleDelete}
        />
      )}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and view all registered users in your
            store.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                  className={`p-3 rounded-full ${stat.bgColor}`}
                >
                  <Icon
                    size={20}
                    className={stat.textColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Customers ({customers?.length || 0})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cart Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers?.map((customer) => {
                const date = new Date(customer.date);
                const year = date.getFullYear();
                const month = date.getMonth();
                return (
                  <tr
                    key={customer._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {customer.userName
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {customer._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <ShoppingCart
                          size={16}
                          className="mr-2 text-gray-400"
                        />
                        {customer.cartItems?.length || 0}{" "}
                        items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar
                          size={16}
                          className="mr-2 text-gray-400"
                        />
                        {customer.date && (
                          <p>
                            {year}/{month}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setIsDeleting(
                              (state) => !state
                            );
                            setCustomerId(customer?._id);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {customers?.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No customers found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No customers have registered yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
