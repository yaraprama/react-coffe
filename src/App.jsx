import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// User Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ReceiptPage from "./pages/ReceiptPage";
import MyOrder from "./pages/MyOrder"; // Import riwayat belanja user
import OurStory from "./pages/OurStory";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/DashboardAdmin";
import OrdersPage from "./pages/admin/orders/OrdersPage"; // Import pesanan untuk admin
import MenuAdminPage from "./pages/admin/menu/MenuAdminPage";

import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  const location = useLocation();
  
  // Mengecek apakah user sedang berada di halaman admin
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app-shell">
      {/* Navbar tetap muncul untuk user, termasuk di halaman receipt */}
      {!isAdmin && <Navbar />}

      <main className="app-main">
        <Routes>
          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/story" element={<OurStory />} />
          
          <Route 
            path="/receipt" 
            element={
              <ProtectedRoute>
                <ReceiptPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/reservation"
            element={
              <ProtectedRoute>
                <ReservationPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="menu" element={<MenuAdminPage />} />
            <Route path="stocks" element={<div>Halaman Stok Bahan</div>} />
            <Route path="analytics" element={<div>Halaman Analisis</div>} />
            <Route path="reviews" element={<div>Halaman Ulasan</div>} />
          </Route>
        </Routes>
      </main>

      {/* Footer tetap muncul untuk user */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;