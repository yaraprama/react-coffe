
// HERO
import bannerImg from "../assets/menu/menu-banner.jpg";
import coffeeImg from "../assets/menu/menu-bread.jpg";

// CATEGORY
import cat1 from "../assets/menu/drink-main.png";
import cat2 from "../assets/menu/drink-botom.png";
import cat3 from "../assets/menu/bread1.jpg";
import cat4 from "../assets/menu/mc.jpg";

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
      price: "$30",
      rating: "⭐ 5.0",
      img: latteImg,
    },
    {
      name: "Matcha Latte",
      desc: "Matcha lembut dengan aroma dan rasa khas Jepang.",
      price: "$30",
      rating: "⭐ 4.9",
      img: matchaImg,
    },
    {
      name: "Chocolate Latte",
      desc: "Coklat premium dengan perpaduan susu creamy, lembut, dan kaya rasa..",
      price: "$35",
      rating: "⭐ 4.8",
      img: chocoImg,
    },
    {
      name: "Espresso",
      desc: "Kopi hitam pekat dengan crema, diracik untuk para penikmat overthinking",
      price: "$25",
      rating: "⭐ 4.7",
      img: espressoImg,
    },
    {
      name: "Cappuccino",
      desc: "Espresso dengan foam susu, menghadirkan rasa halus dan creamy.",
      price: "$38",
      rating: "⭐ 4.8",
      img: cappuccinoImg,
    },
    {
      name: "Croissant Salad",
      desc: "Croissant salad renyah, segar, dan seimbang dalam satu sajian.",
      price: "$42",
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
    <div className="category-item">
      <img src={cat1} alt="Coffee" />
      <span>Coffee</span>
    </div>

    <div className="category-item">
      <img src={cat2} alt="Drink" />
      <span>Non-Coffe</span>
    </div>

    <div className="category-item">
      <img src={cat3} alt="Bread" />
      <span>Bread</span>
    </div>

    <div className="category-item">
      <img src={cat4} alt="Special" />
      <span>Main Course</span>
    </div>
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
