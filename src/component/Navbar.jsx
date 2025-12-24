import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className={`app-header ${isHome ? "home-header" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="app-brand">
          ARUA · <span>COFFE</span>
        </div>

        {/* Menu */}
        <nav className="app-nav">
          <Link className={isHome ? "active" : ""} to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/story">OUR STORY</Link>
          <Link to="/contact">CONTACT / RESERVATION</Link>
        </nav>

        {/* Right */}
        <div className="app-header-right">
          {!isAuthenticated ? (
            <Link to="/login" className="icon-login">👤</Link>
          ) : (
            <>
              <span className="tag">
                <strong>{user?.name}</strong>
              </span>
              <button className="btn btn-ghost" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
