import { Link } from "react-router-dom";

export default function CartPage() {
  // dummy data (nanti bisa diganti dari context / backend)
  const cartItems = [
    {
      id: 1,
      name: "Espresso",
      price: 25000,
      qty: 2,
      image: "/src/assets//menu/espresso.jpg",
    },
    {
      id: 2,
      name: "Croissant Salad",
      price: 42000,
      qty: 1,
      image: "/src/assets/menu/croissant.jpg",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

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
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Rp {item.price.toLocaleString("id-ID")}</p>
                </div>

                <div className="cart-qty">
                  <button>-</button>
                  <span>{item.qty}</span>
                  <button>+</button>
                </div>

                <div className="cart-subtotal">
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total</h3>
            <p className="cart-total">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>

            <button className="btn btn-primary btn-full">
              Pesan Sekarang
            </button>
          </div>
        </>
      )}
    </section>
  );
}
