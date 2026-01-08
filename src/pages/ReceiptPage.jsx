import { useLocation, Link } from "react-router-dom";
import "./ReceiptPage.css"; // Pastikan kamu punya file CSS-nya

export default function ReceiptPage() {
  const location = useLocation();
  
  // Mengambil data 'transaction' yang dikirim dari navigate di CartPage
  const { transaction } = location.state || {};

  // Jika data transaksi tidak ada (misal user akses langsung via URL)
  if (!transaction) {
    return (
      <div className="receipt-container">
        <h2>Data transaksi tidak ditemukan</h2>
        <Link to="/menu">Kembali ke Menu</Link>
      </div>
    );
  }

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-header">
          <h1>☕ ARUA COFFEE</h1>
          <p>Terima kasih atas pesanan Anda!</p>
        </div>

        <div className="receipt-body">
          <div className="info-row">
            <span>ID Transaksi:</span>
            <span>#{transaction.id}</span>
          </div>
          <div className="info-row">
            <span>Status:</span>
            <span className="status-badge">{transaction.status}</span>
          </div>
          <div className="info-row">
            <span>Tanggal:</span>
            <span>{new Date(transaction.created_at).toLocaleString("id-ID")}</span>
          </div>
          
          <hr />
          
          <div className="total-row">
            <h3>Total Bayar</h3>
            <h3>Rp {transaction.total_amount?.toLocaleString("id-ID")}</h3>
          </div>
        </div>

        <div className="receipt-footer">
          <p>Silahkan tunjukkan struk ini ke kasir untuk pembayaran.</p>
          <button onClick={() => window.print()} className="btn-print">
            Cetak Struk
          </button>
          <Link to="/menu" className="btn-back">Pesan Lagi</Link>
        </div>
      </div>
    </div>
  );
}