import { useState, useEffect } from "react";
import axios from "axios";
import OrderDetailModal from "./OrderDetailModal";
import { useAuth } from "../../../context/AuthContext"; 
import "./orders.css";

const PER_PAGE = 5;

// Helper: Cek apakah tanggal hari ini
function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Helper: Cek apakah tanggal minggu ini
function isThisWeek(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  return date >= startOfWeek && date <= now;
}

// Helper: Cek apakah tanggal bulan ini
function isThisMonth(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // 1. Ambil data dari API Laravel
  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/admin/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const transformedData = res.data.map(order => ({
        id: `ORD-${order.id.toString().padStart(3, '0')}`, // Untuk tampilan UI
        rawId: order.id,                                   // ID asli untuk kirim ke API
        customer: order.user?.name || "Guest",
        status: order.status, 
        total: order.total_amount,
        date: order.created_at,
        details: order.details 
      }));
      
      setOrders(transformedData);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Update Status (Sesuai dengan validasi Laravel: pending, diproses, selesai, dibatalkan)
  const handleStatusChange = async (idAsli, newStatus) => {
    try {
      // Pastikan URL dan Method sesuai dengan api.php
      await axios.put(`http://localhost:8000/api/admin/transactions/${idAsli}/status`, 
        { status: newStatus },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          } 
        }
      );
      
      // Update state lokal agar UI berubah seketika
      setOrders(prev => prev.map(o => o.rawId === idAsli ? { ...o, status: newStatus } : o));
      console.log(`Berhasil update pesanan #${idAsli} ke ${newStatus}`);
    } catch (err) {
      console.error("Detail Error Update Status:", err.response?.data);
      alert("Gagal memperbarui status ke server. Cek console (F12) untuk detail error.");
    }
  };

  // Logika Filter & Search
  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());

    let matchDate = true;
    if (filterDate === "today") matchDate = isToday(o.date);
    if (filterDate === "week") matchDate = isThisWeek(o.date);
    if (filterDate === "month") matchDate = isThisMonth(o.date);

    return matchSearch && matchDate;
  });

  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  if (loading) return <div className="loading-admin">Memuat data pesanan...</div>;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Pesanan</h2>

        <div className="orders-header-right">
          <span className="orders-date">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
            })}
          </span>

          <select
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">Semua</option>
            <option value="today">Hari ini</option>
            <option value="week">Minggu ini</option>
            <option value="month">Bulan ini</option>
          </select>

          <input
            placeholder="Cari order / customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="orders-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada pesanan</td>
              </tr>
            ) : (
              paginated.map((order) => (
                <tr key={order.rawId}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    {/* Value di option HARUS sama dengan validasi di Laravel */}
                    <select
                      className={`status ${order.status}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.rawId, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="diproses">Diproses</option>
                      <option value="selesai">Selesai</option>
                      <option value="dibatalkan">Dibatalkan</option>
                    </select>
                  </td>
                  <td>Rp {order.total.toLocaleString("id-ID")}</td>
                  <td>
                    <button className="detail-btn" onClick={() => setSelectedOrder(order)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filtered.length / PER_PAGE) }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}