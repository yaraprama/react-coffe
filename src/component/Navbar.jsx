import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="app-brand">
          ARUA · <span>COFFE</span>
        </Link>

        {/* MENU */}
        <nav className="app-nav">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/story">OUR STORY</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>

        {/* ACTION ICONS */}
        <div className="nav-actions">
          <button className="nav-icon">
            <FiSearch />
          </button>

          <button className="nav-icon" onClick={() => navigate("/cart")}>
            <FiShoppingCart />
          </button>

          {!isAuthenticated ? (
            <button className="nav-icon" onClick={() => navigate("/login")}>
              <FiUser />
            </button>
          ) : (
            <div className="nav-user">
              <button
                className="nav-icon"
                onClick={() => setOpen(!open)}
              >
                <FiUser />
              </button>

              {open && (
                <div className="user-dropdown">
                  <button
                    className="logout-btn"
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/login");
                    }}
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
