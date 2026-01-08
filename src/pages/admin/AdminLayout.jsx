import { Icon } from "@iconify/react";
import { NavLink, Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="logo">Arua</h1>

        <nav>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:view-dashboard" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:receipt-text" />
            <span>Pesanan</span>
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:coffee" />
            <span>Menu</span>
          </NavLink>

          <NavLink
            to="/admin/stocks"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:package-variant" />
            <span>Stok Bahan</span>
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:chart-line" />
            <span>Analisis</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon icon="mdi:message-text" />
            <span>Ulasan</span>
          </NavLink>
        </nav>

        <img className="sidebar-img" src="/coffee.jpg" alt="coffee" />
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <Icon icon="mdi:menu" width="24" />

          <div className="search-box">
            <input placeholder="Search" />
            <Icon icon="mdi:magnify" />
          </div>

          <button className="filter-btn">
            <Icon icon="mdi:filter" />
            Filter
          </button>

          <div className="topbar-right">
            <Icon icon="mdi:bell-outline" />
            <Icon icon="mdi:cog-outline" />
            <img
              src="https://i.pravatar.cc/40"
              className="avatar"
              alt="avatar"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="page">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
