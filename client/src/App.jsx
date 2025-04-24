import {
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
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
            path="products"
            element={<AdminProducts />}
          />
          <Route path="orders" element={<AdminOrders />} />
          <Route
            path="features"
            element={<AdminFeatures />}
          />
        </Route>

        {/* shopping routes  */}

        <Route
          path="/shop"
          element={
            <ProtectedRoutes>
              <ShoppingLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="account" element={<AccountPage />} />
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
          <Route path="home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
