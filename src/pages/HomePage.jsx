import imgMain from "../assets/drink-main.png";
import imgTop from "../assets/drink-mid.png";
import imgBottom from "../assets/drink-botom.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* TEXT */}
      <div className="hero-text">
        <h1>
          WHERE AROMA,<br />MEETS AURA
        </h1>

        <p>
          Temukan harmoni antara rasa, aroma, dan suasana.
          Duduk sejenak – biarkan Arua berbicara dalam setiap teguk.
        </p>

        {/* ⬇️ BUTTON KE MENU */}
        <button
          className="btn btn-primary"
          onClick={() => navigate("/menu")}
        >
          Lihat Sekarang
        </button>
      </div>

      {/* HERO VISUAL 3 IMAGE */}
      <div className="hero-visual">
        <div
          className="hero-img main"
          style={{ backgroundImage: `url(${imgMain})` }}
        />
        <div
          className="hero-img top"
          style={{ backgroundImage: `url(${imgTop})` }}
        />
        <div
          className="hero-img bottom"
          style={{ backgroundImage: `url(${imgBottom})` }}
        />
      </div>
    </section>
  );
}
