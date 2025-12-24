const menus = [
  {
    id: 1,
    name: "Espresso",
    price: "25K",
    image: "/src/assets/menu/espresso.jpg",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: "30K",
    image: "/src/assets/menu/cappuccino.jpg",
  },
  {
    id: 3,
    name: "Latte",
    price: "32K",
    image: "/src/assets/menu/latte.jpg",
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    price: "35K",
    image: "/src/assets/menu/caramel.jpg",
  },
];

export default function MenuPage() {
  return (
    <section className="menu-page">
      <header className="menu-header">
        <h1>Our Menu</h1>
        <p>Pilihan kopi terbaik dari Arua Coffee</p>
      </header>

      <div className="menu-grid">
        {menus.map((item) => (
          <div key={item.id} className="menu-card">
            <div
              className="menu-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <span>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
