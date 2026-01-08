// src/pages/admin/orders/OrderDetailModal.jsx

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Detail Pesanan</h3>

        <p><b>ID:</b> {order.id}</p>
        <p><b>Customer:</b> {order.customer}</p>
        <p><b>Tanggal:</b> {new Date(order.date).toLocaleString("id-ID")}</p>

        <h4>Item</h4>
        <ul>
          {/* Kita pakai order.details karena itu data dari Laravel kita */}
          {order.details && order.details.length > 0 ? (
            order.details.map((item, i) => (
              <li key={i}>
                {item.product?.name || "Produk Hilang"} x{item.quantity} — Rp{" "}
                {(item.quantity * item.price).toLocaleString("id-ID")}
              </li>
            ))
          ) : (
            <li>Tidak ada item</li>
          )}
        </ul>

        <hr />
        <h4>Total: Rp {order.total.toLocaleString("id-ID")}</h4>

        <button onClick={onClose} style={{ marginTop: "15px", cursor: "pointer" }}>
          Tutup
        </button>
      </div>
    </div>
  );
}