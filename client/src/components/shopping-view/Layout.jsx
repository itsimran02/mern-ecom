import { Link, Outlet } from "react-router-dom";
import { Header } from "../ui/Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Header />

      <Link to="/admin/dashboard">click</Link>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
