import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Panggil loginApi dari auth.js (ini menggunakan fetch/apiRequest)
      const response = await loginApi(form);
      
      // DEBUG: Lihat di console (F12) apakah ada .token langsung atau harus pakai .data
      console.log("Response Backend:", response);

      /**
       * KARENA PAKAI FETCH (apiRequest):
       * Biasanya data tidak dibungkus .data lagi. 
       * Langsung ambil response.token dan response.user
       */
      const token = response?.token;
      const user = response?.user;

      if (token) {
        login(token, user); 
        console.log("Login sukses!");
        navigate("/"); 
      } else {
        // Jika gagal, ambil pesan error dari backend
        setError(response?.message || "Gagal mendapatkan akses dari server.");
      }

    } catch (err) {
      console.error("Login Error:", err);
      // Ambil pesan error dari throw yang ada di apiClient
      setError(err.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card" style={{ width: "450px", margin: "80px auto" }}>
        <div className="card-header text-center">
          <h2 className="card-title">Login</h2>
          <p className="card-subtitle">Selamat datang kembali di Arua Coffee</p>
        </div>

        <div className="card-body">
          <form className="form-vertical" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: "15px", color: "red" }}>
                <strong>Error:</strong> {error}
              </div>
            )}

            <div className="btn-row">
              <button
                className="btn btn-primary btn-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sedang Masuk..." : "Login"}
              </button>
            </div>

            <div className="text-center login-link" style={{ marginTop: "20px" }}>
              <p>
                Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;