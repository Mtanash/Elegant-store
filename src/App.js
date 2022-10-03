import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductForm from "./components/AddProductForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PersistentLogin from "./components/PersistentLogin";
import RequireAuth from "./components/RequireAuth";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import DashboardInfo from "./pages/DashboardPage/DashboardInfo";
import DashboardOrdersPage from "./pages/DashboardPage/DashboardOrdersPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProductsList from "./pages/DashboardPage/ProductsList";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import FavoriteProductsPage from "./pages/ProfilePage/FavoriteProductsPage";
import ProfileInfoPage from "./pages/ProfilePage/ProfileInfoPage";
import ProfileOrdersPage from "./pages/ProfilePage/ProfileOrdersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Header />
      <Routes>
        <Route element={<PersistentLogin />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/products-search" element={<SearchPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardInfo />} />
              <Route path="info" element={<DashboardInfo />} />
              <Route path="create-product" element={<AddProductForm />} />
              <Route path="orders" element={<DashboardOrdersPage />} />
              <Route path="orders/:id" element={<OrderPage />} />
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
