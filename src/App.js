import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import DashboardInfo from "./pages/DashboardPage/DashboardInfo";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import FavoriteProductsPage from "./pages/ProfilePage/FavoriteProductsPage";
import ProfileInfoPage from "./pages/ProfilePage/ProfileInfoPage";
import ProductsList from "./pages/DashboardPage/ProductsList";
import DashboardOrdersPage from "./pages/DashboardPage/DashboardOrdersPage";
import ProfileOrdersPage from "./pages/ProfilePage/ProfileOrdersPage";
import PersistentLogin from "./components/PersistentLogin/PersistentLogin";
import SnackbarAlert from "./components/SnackbarAlert/SnackbarAlert";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SnackbarAlert />
      <Routes>
        <Route element={<PersistentLogin />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/products-search" element={<SearchPage />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardInfo />} />
              <Route path="info" element={<DashboardInfo />} />
              <Route path="create-product" element={<AddProductForm />} />
              <Route path="orders" element={<DashboardOrdersPage />} />
              <Route path="products" element={<ProductsList />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
            <Route path="/me" element={<ProfilePage />}>
              <Route index element={<ProfileInfoPage />} />
              <Route
                path="favorite-products"
                element={<FavoriteProductsPage />}
              />
              <Route path="info" element={<ProfileInfoPage />} />
              <Route path="orders" element={<ProfileOrdersPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
