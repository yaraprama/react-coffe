import { Icon } from "@iconify/react";
import "./OurStory.css";

export default function OurStory() {
  return (
    <div className="story-container">
      {/* Bagian 1: Hero Section */}
      <section className="story-hero">
        <h1>Membangun Cerita di Setiap Cangkir</h1>
        <p>Lebih dari sekadar kopi, kami menghadirkan kehangatan dan inspirasi sejak 2024.</p>
      </section>

      {/* Bagian 2: Content Section */}
      <section className="story-content">
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Our Coffee Journey" />
        </div>
        <div className="story-text">
          <h2>Awal Mula Arua</h2>
          <p>
            Arua lahir dari kecintaan kami terhadap biji kopi lokal Indonesia. Kami percaya bahwa setiap biji kopi 
            memiliki cerita unik dari petani yang merawatnya hingga barista yang menyajikannya dengan hati.
          </p>
          <p>
            Misi kami adalah menciptakan ruang ketiga bagi Anda—tempat yang nyaman di antara rumah dan kantor 
            untuk bersantai, bekerja, dan berbagi ide.
          </p>
        </div>
      </section>

      {/* Bagian 3: Core Values (Ikonik) */}
      <section className="story-values">
        <div className="value-card">
          <Icon icon="mdi:leaf" className="value-icon" />
          <h3>Kualitas Alami</h3>
          <p>Menggunakan 100% biji kopi pilihan langsung dari petani lokal.</p>
        </div>
        <div className="value-card">
          <Icon icon="mdi:hand-heart" className="value-icon" />
          <h3>Dibuat dengan Hati</h3>
          <p>Setiap cangkir diracik dengan presisi untuk rasa yang konsisten.</p>
        </div>
        <div className="value-card">
          <Icon icon="mdi:account-group" className="value-icon" />
          <h3>Komunitas</h3>
          <p>Menjadi wadah kolaborasi bagi komunitas kreatif di kota ini.</p>
        </div>
      </section>
    </div>
  );
}