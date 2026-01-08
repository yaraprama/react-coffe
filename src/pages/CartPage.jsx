// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./CartPage.css";

export default function CartPage() {
  const { token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Ambil cart dari backend
  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await axios.get("http://localhost:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.data || res.data); 
    } catch (err) {
      console.error("Gagal mengambil data keranjang:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // Tambah qty
  const incrementQty = async (item) => {
    try {
      await axios.post(
        "http://localhost:8000/api/cart",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prev) =>
        prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Kurangi qty
  const decrementQty = async (item) => {
    if (item.qty <= 1) {
      try {
        await axios.delete(`http://localhost:8000/api/cart/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems((prev) => prev.filter((c) => c.id !== item.id));
      } catch (err) {
        console.error(err);
      }
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/cart",
        { product_id: item.product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prev) =>
        prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty - 1 } : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.qty,
    0
  );

  // ==========================================
  // FUNGSI CHECKOUT (KOREKSI DI SINI)
  // ==========================================
  const checkout = async () => {
    if (!cartItems.length) {
      alert("Keranjang kosong!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/checkout",
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json' 
          } 
        }
      );

      // Sesuai dengan response Laravel: return response()->json(['transaction' => ...])
      const transaction = res.data.transaction;

      alert("Pesanan berhasil dibuat!");

      // Pastikan route /receipt sudah ada di App.js
      navigate("/receipt", { state: { transaction } });

    } catch (err) {
      // Menampilkan log detail di console agar kita tahu jika ada kolom DB yang salah
      console.error("Detail Error Checkout:", err.response?.data);
      
      const msg = err.response?.data?.error || err.response?.data?.message || "Gagal checkout";
      alert(msg);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-empty">
        <p>Silakan login terlebih dahulu</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h1 className="cart-title">Keranjang Pesanan</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Keranjang kamu masih kosong ☕</p>
          <Link to="/menu" className="btn btn-primary">
            Kembali ke Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`http://localhost:8000/storage/uploads/product/${item.product?.image}`}
                  alt={item.product?.name}
                  className="cart-item-img"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                />

                <div className="cart-info">
                  <h3>{item.product?.name}</h3>
                  <p>Rp {item.product?.price?.toLocaleString("id-ID")}</p>
                </div>

                <div className="cart-qty">
                  <button onClick={() => decrementQty(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => incrementQty(item)}>+</button>
                </div>

                <div className="cart-subtotal">
                  Rp {(item.product?.price * item.qty).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total</h3>
            <p className="cart-total">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
            <button
              className="btn btn-primary btn-full"
              onClick={checkout}
            >
              Pesan Sekarang  
            </button>
          </div>
        </>
      )}
    </section>
  );
}