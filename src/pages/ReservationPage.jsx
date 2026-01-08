import { useState } from "react";
import axios from "axios";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ReservationPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
    guest: 2, // ✅ HARUS guest (bukan guests)
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Ambil token dari context, kalau kosong ambil dari localStorage
  const currentToken = token || localStorage.getItem("auth_token");

  console.log("Token yang dicoba:", currentToken);

 if (!currentToken || currentToken === "undefined") {
    alert("Token tidak valid. Silakan logout lalu login kembali.");
    return;
  }

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/reservations",
      {
        date: form.date,
        time: form.time,
        guest: form.guest,
        note: form.note,
      },
      {
        headers: {
          // Pastikan key-nya 'auth_token' sesuai dengan yang di Context
          Authorization: `Bearer ${currentToken}`, 
          Accept: "application/json",
        },
      }
    );

    console.log("SUCCESS:", res.data);
    alert("Reservasi berhasil dibuat!");
    navigate("/profile"); // atau arahkan ke mana saja setelah sukses
  } catch (err) {
    console.error("ERROR DETAIL:", err.response?.data);
    alert(err.response?.data?.message || "Gagal membuat reservasi");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="card reservation-card">
        <div className="card-header text-center">
          <h2 className="card-title">Reservasi Meja</h2>
          <p className="card-subtitle">
            Silakan isi detail reservasi kamu
          </p>
        </div>

        <div className="card-body">
          <form className="form-vertical" onSubmit={handleSubmit}>

            <div className="form-field">
              <label className="form-label">Nama</label>
              <input
                className="input"
                value={user?.name || ""}
                disabled
              />
            </div>

            <div className="form-field">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                name="date"
                className="input"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Waktu</label>
              <input
                type="time"
                name="time"
                className="input"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Jumlah Tamu</label>
            <input
              type="number"
              min="1"
              max="10"
              name="guest"
              className="input"
              value={form.guest}
              onChange={handleChange}
            />

            </div>

            <div className="form-field">
              <label className="form-label">Catatan</label>
              <textarea
                name="note"
                className="input"
                rows="3"
                value={form.note}
                onChange={handleChange}
                placeholder="Contoh: dekat jendela"
              />
            </div>

            {error && (
              <div className="alert alert-error">{error}</div>
            )}

            <div className="btn-row">
              <button
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Reservasi"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
