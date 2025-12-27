import imgBeans from "../assets/about2.png";
import imgPour from "../assets/about1.png";

export default function AboutPage() {
  return (
    <section className="about">
      {/* LEFT TEXT */}
      <div className="about-text">
        <h1>Tentang Arua-Coffe</h1>

        <p>
          Arua lahir dari cinta pada aroma kopi dan aura pertemuan.
          Kami percaya setiap cangkir kopi menyimpan cerita dan
          suasana — tempat kamu berhenti sejenak untuk merasa.
        </p>
      </div>

      {/* RIGHT VISUAL */}
      <div className="about-visual">
        <div
          className="about-img about2"
          style={{ backgroundImage: `url(${imgBeans})` }}
        />
        <div
          className="about-img about1"
          style={{ backgroundImage: `url(${imgPour})` }}
        />
      </div>
    </section>
  );
}
