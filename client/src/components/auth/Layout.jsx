import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex bg-black flex-1 justify-center items-center box-border">
        <h1 className="text-white text-5xl font-bold font-main uppercase text-center p-6">
          welcome to ecommerce shopping
        </h1>
      </div>
      <div className="flex-1 flex justify-center items-center py-12 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
