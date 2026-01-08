import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./OrdersPage.css"; 

export default function MyOrder() { // Nama fungsi disesuaikan
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Gagal mengambil riwayat:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, isAuthenticated, navigate]);

  if (loading) return <div className="loader">Memuat Riwayat...</div>;

  return (
    <div className="orders-container" style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Riwayat Pesanan Saya</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Kamu belum pernah melakukan pemesanan ☕</p>
          <Link to="/menu" className="btn btn-primary">Pesan Sekarang</Link>
        </div>
      ) : (
        <div className="orders-table-wrapper" style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', background: '#f8f9fa' }}>
                <th style={{ padding: '15px' }}>ID Transaksi</th>
                <th style={{ padding: '15px' }}>Tanggal</th>
                <th style={{ padding: '15px' }}>Total Bayar</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>#{order.id}</td>
                  <td style={{ padding: '15px' }}>
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </td>
                  <td style={{ padding: '15px' }}>Rp {order.total_amount?.toLocaleString("id-ID")}</td>
                  <td style={{ padding: '15px' }}>
                    <span className={`status-badge ${order.status === 'pending' ? 'status-pending' : 'status-completed'}`} 
                      style={{ 
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        background: order.status === 'pending' ? '#fff3cd' : '#d4edda',
                        color: order.status === 'pending' ? '#856404' : '#155724'
                      }}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button 
                      onClick={() => navigate("/receipt", { state: { transaction: order } })}
                      className="btn-detail"
                      style={{ 
                        backgroundColor: '#6f4e37', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 15px', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Lihat Struk
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}