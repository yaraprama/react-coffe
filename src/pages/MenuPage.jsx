import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./MenuPage.css"; 

// HERO
import bannerImg from "../assets/menu/menu-banner.jpg";
import coffeeImg from "../assets/menu/menu-bread.jpg";

// CATEGORY
import cat1 from "../assets/menu/drink-main.png";
import cat2 from "../assets/menu/drink-botom.png";
import cat3 from "../assets/menu/bread1.jpg";
import cat4 from "../assets/menu/mc.jpg";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false); 
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Gagal mengambil data produk:", err));
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const addToCart = async (productId) => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/cart",
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Produk ditambahkan ke keranjang");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Gagal menambahkan ke keranjang");
    } finally {
      setLoading(false);
    }
  };

  const visibleMenus = showAll ? menus : menus.slice(0, 6);

  return (
    <div className="menu-page">
      {/* HEADER */}
      <div className="menu-header">
        <span className="welcome">Welcome,</span>
        <p>Menu kami yang tersedia, sebagai pilihan anda</p>
      </div>

      {/* HERO */}
      <div className="menu-hero">
        <div className="hero-left">
          <img src={bannerImg} alt="Menu Banner" />
        </div>
        <div className="hero-right">
          <img src={coffeeImg} alt="Coffee & Croissant" />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="menu-category">
        <h3>Kategori</h3>
        <div className="category-scroll">
          {[cat1, cat2, cat3, cat4].map((cat, idx) => (
            <div className="category-item" key={idx}>
              <img src={cat} alt={`Category ${idx}`} />
              <span>
                {idx === 0 ? "Coffee" : idx === 1 ? "Non-Coffee" : idx === 2 ? "Bread" : "Main Course"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MENU LIST */}
      <div className="menu-top">
        <div className="menu-top-header">
          <h3>Kategori Teratas</h3>
          <span
            className="see-more"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Tampilkan lebih sedikit" : "Lihat Selengkapnya ➜"}
          </span>
        </div>

        <div className="menu-grid">
          {visibleMenus.map((item) => (
            <div className="menu-card" key={item.id}>
              {item.image ? (
                <img
                  src={`http://localhost:8000/storage/uploads/product/${item.image}`}
                  alt={item.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}

              <div className="menu-info">
                <h4>{item.name}</h4>
                <p>{item.description}</p>

                <div className="menu-footer">
                  <span className="price">{formatPrice(item.price)}</span>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item.id)}
                    disabled={loading}
                  >
                    {loading ? "..." : "+"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}