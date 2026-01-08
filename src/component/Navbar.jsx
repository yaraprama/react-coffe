import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Fungsi helper untuk memberikan class "active"
  const activeClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="app-header">
      <div className="navbar-container">

        {/* LOGO */}
        <NavLink to="/" className="app-brand">
          ARUA · <span>COFFE</span>
        </NavLink>

        {/* MENU DENGAN ACTIVE LINK */}
        <nav className="app-nav">
          <NavLink to="/" className={activeClass}>HOME</NavLink>
          <NavLink to="/about" className={activeClass}>ABOUT</NavLink>
          <NavLink to="/menu" className={activeClass}>MENU</NavLink>
          <NavLink to="/story" className={activeClass}>OUR STORY</NavLink>
          <NavLink to="/reservation" className={activeClass}>RESERVATION</NavLink>
          <NavLink to="/contact" className={activeClass}>CONTACT</NavLink>
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