
// HERO
import bannerImg from "../assets/menu/menu-banner.jpg";
import coffeeImg from "../assets/menu/menu-bread.jpg";

// CATEGORY
import cat1 from "../assets/menu/drink-main.png";
import cat2 from "../assets/menu/drink-botom.png";
import cat3 from "../assets/menu/bread1.jpg";
import cat4 from "../assets/menu/drinkctr.png";

// PRODUCT IMAGE
import latteImg from "../assets/menu/latte.jpg";
import matchaImg from "../assets/menu/matcha.jpg";
import chocoImg from "../assets/menu/choco.jpg";
import croissantImg from "../assets/menu/croissant.jpg";
import espressoImg from "../assets/menu/espresso.jpg";
import cappuccinoImg from "../assets/menu/cappucino.jpg";

export default function MenuPage() {

  // ===== DATA PRODUK (WAJIB) =====
  const topMenus = [
    {
      name: "Cinamond Latte",
      desc: "Latte creamy dengan aroma kayu manis hangat.",
      price: "$45",
      rating: "⭐ 5.0",
      img: latteImg,
    },
    {
      name: "Matcha Latte",
      desc: "Matcha lembut dengan rasa khas Jepang.",
      price: "$42",
      rating: "⭐ 4.9",
      img: matchaImg,
    },
    {
      name: "Chocolate Latte",
      desc: "Coklat premium dengan susu creamy.",
      price: "$40",
      rating: "⭐ 4.8",
      img: chocoImg,
    },
    {
      name: "Espresso",
      desc: "Kopi hitam pekat dengan crema halus.",
      price: "$35",
      rating: "⭐ 4.7",
      img: espressoImg,
    },
    {
      name: "Cappuccino",
      desc: "Espresso dengan foam susu lembut.",
      price: "$38",
      rating: "⭐ 4.8",
      img: cappuccinoImg,
    },
    {
      name: "Croissant",
      desc: "Roti butter renyah ala Perancis.",
      price: "$30",
      rating: "⭐ 4.9",
      img: croissantImg,
    },
  ];

  return (
    <div className="menu-page">

      {/* ===== HEADER ===== */}
      <div className="menu-header">
        <span className="welcome">Welcome,</span>
        <p>Menu kami yang tersedia, sebagai pilihan anda,</p>
      </div>

      {/* ===== HERO ===== */}
      <div className="menu-hero">
        <div className="hero-left">
          <img src={bannerImg} alt="Menu Banner" />
        </div>

        <div className="hero-right">
          <img src={coffeeImg} alt="Coffee & Croissant" />
        </div>
      </div>

      {/* ===== CATEGORY ===== */}
      <div className="menu-category">
        <h3>Kategori</h3>
        <div className="category-scroll">
          <img src={cat1} alt="Coffee" />
          <img src={cat2} alt="Drink" />
          <img src={cat3} alt="Bread" />
          <img src={cat4} alt="Special" />
        </div>
      </div>

      {/* ===== TOP MENU ===== */}
      <div className="menu-top">
        <div className="menu-top-header">
          <h3>Kategori Teratas</h3>
          <span>Selengkapnya ➜</span>
        </div>

        <div className="menu-grid">
          {topMenus.map((item, i) => (
            <div className="menu-card" key={i}>
              <img src={item.img} alt={item.name} />

              <div className="menu-card-body">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>

                <div className="menu-card-footer">
                  <span className="price">{item.price}</span>
                  <span className="rating">{item.rating}</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
