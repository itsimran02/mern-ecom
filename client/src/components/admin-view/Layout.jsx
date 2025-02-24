import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        {/* header  */}
        <AdminHeader />
        <main className="flex flex-1 flex-col bg-[#eefbf5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
