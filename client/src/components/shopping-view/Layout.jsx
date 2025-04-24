import { Link, Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden ">
      <Header />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
