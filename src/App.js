import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import ProductPage from "./components/ProductPage/ProductPage";
import AuthPage from "./components/AuthPage/AuthPage";
import Home from "./components/Home/Home";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SearchPage from "./components/SearchPage/SearchPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
          <Route path="/me" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
