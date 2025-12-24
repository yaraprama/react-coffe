import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
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
    setError('');
    setLoading(true);

    try {
      const data = await loginApi(form);
      login(data.token, data.user);
      navigate('/HomePage');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    navigate('/todos');
  }

  return (
    <div className="login-page">
      <div className="card" style={{ width: "500px", height: "500px" }}>
        <div className="card-header">
          <h2 className="card-title">Login</h2>
          <p className="card-subtitle">Masukkan email dan kata sandi anda</p>
        </div>

        <div className="card-body">
          <form className="form-vertical" onSubmit={handleSubmit}>
            
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Password</label>
              <input
                className="input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Login..." : "Login"}
              </button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
