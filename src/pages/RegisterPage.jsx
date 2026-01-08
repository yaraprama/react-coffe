import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../api/auth";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validasi frontend
    if (form.password !== form.password_confirmation) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    try {
      // 🔥 REGISTER ONLY (tanpa login)
      await registerApi(form);

      // pastikan tidak ada auth tersisa
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ➜ arahkan ke login
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Buat Akun Baru</h2>
          <p className="register-subtitle">
            Silakan daftar untuk menikmati layanan Arua Coffee
          </p>
        </div>

        <div className="register-body">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
              <label className="register-label">Nama</label>
              <input
                className="register-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label className="register-label">Email</label>
              <input
                className="register-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label className="register-label">Password</label>
              <input
                className="register-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label className="register-label">Konfirmasi Password</label>
              <input
                className="register-input"
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="register-error">{error}</div>}

            <button
              className="register-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>

            <p className="register-footer">
              Sudah punya akun?{" "}
              <Link to="/login" className="register-link">
                Login di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

