import { Outlet } from "react-router-dom";
import AdminHeader from "./Header.jsx";
import AdminSidebar from "./Sidebar.jsx";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header */}
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 bg-[#eefbf5] min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
