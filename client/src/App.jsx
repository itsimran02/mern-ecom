import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/Orders";

import ShoppingLayout from "./components/shopping-view/Layout";
import NotFoundPage from "./pages/not-found";
import AccountPage from "./pages/shopping/Account";
import CheckoutPage from "./pages/shopping/Checkout";
import ListingPage from "./pages/shopping/Listing";
import HomePage from "./pages/shopping/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import ProductPage from "./pages/shopping/Product";
import ProductDescription from "./pages/shopping/ProductDescription";
import SearchProducts from "./pages/shopping/ProductsSearch";
import ShopingCart from "./pages/shopping/ShopingCart";
import CancelPage from "./pages/payment/Cancel";
import SuccessfullPage from "./pages/payment/Successfull";
import Profile from "./pages/common/Profile";
import AddNewProduct from "./pages/admin/AddProducts.jsx";
import UpdateProduct from "./components/admin-view/UpdateProduct.jsx";
import Customers from "./pages/admin/Customers.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <Routes>
        {/* auth routes  */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <h1>home</h1>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/auth"
          element={
            <ProtectedRoutes>
              <AuthLayout />
            </ProtectedRoutes>
          }
        >
          <Route
            index
            element={<Navigate to="login" replace />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>

        {/* admin routes  */}

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="addproduct"
            element={<AddNewProduct />}
          />
          <Route path="customers" element={<Customers />} />
          <Route
            path="products/updateproduct/:productId"
            element={<UpdateProduct />}
          />
          <Route
            path="products"
            element={<AdminProducts />}
          />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="profile" element={<Profile />} />

        {/* shopping routes  */}

        <Route
          path="/shop"
          element={
            <ProtectedRoutes>
              <ShoppingLayout />
            </ProtectedRoutes>
          }
          replace
        >
          <Route
            path="payment-failed"
            element={<CancelPage />}
          />
          <Route
            path="payment-successfull"
            element={<SuccessfullPage />}
          />
          <Route path="cart" element={<ShopingCart />} />
          <Route
            path="account"
            element={<AccountPage />}
            replace
          />
          <Route
            path="checkout"
            element={<CheckoutPage />}
          />
          <Route
            path="listings"
            element={<ListingPage />}
          />
          <Route
            path="products"
            element={<ProductPage />}
          />

          <Route
            path="products/:id"
            element={<ProductDescription />}
          />
          <Route
            path="products/search"
            element={<SearchProducts />}
          />
          <Route path="profile" element={<Profile />} />

          <Route
            path="home"
            element={<HomePage />}
            replace
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
          replace
        />
      </Routes>
    </div>
  );
}

export default App;
