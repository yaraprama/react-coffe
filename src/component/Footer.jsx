export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h3>ARUA · COFFE</h3>
          <p>
            Tempat di mana aroma bertemu dengan aura.
            Nikmati kopi terbaik dalam suasana yang hangat.
          </p>
        </div>

        {/* MENU */}
        <div className="footer-links">
          <h4>Menu</h4>
          <a href="/menu">Coffee</a>
          <a href="/menu">Non Coffee</a>
          <a href="/menu">Snack</a>
        </div>

        {/* CONTACT */}
        <div className="footer-links">
          <h4>Contact</h4>
          <span>Jl. Aroma No. 21</span>
          <span>arua@coffee.com</span>
          <span>+62 812 3456 7890</span>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ARUA COFFE. All rights reserved.
      </div>
    </footer>
  );
}
