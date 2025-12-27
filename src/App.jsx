import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import MenuPage from "./pages/MenuPage"; // ⬅️ TAMBAHAN
import CartPage from "./pages/CartPage";
import Footer from "./component/Footer"; 
import ProtectedRoute from "./component/ProtectedRoute";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* MENU PAGE */}
          <Route path="/menu" element={<MenuPage />} />

          
              <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path="/about" element={<AboutPage />} />

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
        </Routes>
      </main>
      
      <Footer /> {/* ⬅️ FOOTER */}
    </div>
  );
}

export default App;
