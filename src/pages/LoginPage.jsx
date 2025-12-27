import { useState } from "react";
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
      const data = await loginApi(form);
      login(data.token, data.user);
      navigate("/"); // balik ke homepage
    } catch (err) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  // Kalau sudah login, jangan bisa buka login lagi
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="login-page">
      <div className="card" style={{ width: "500px" }}>
        <h2 className="card-title">Login</h2>
        <p className="card-subtitle">
          Masukkan email dan kata sandi anda
        </p>

        <form className="form-vertical" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
          </button>

          {/* LINK REGISTER */}
          <p className="login-link">
            Belum punya akun?{" "}
            <Link to="/register">Daftar di sini</Link>
          </p>

          {/* ERROR */}
          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
