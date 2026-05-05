import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "amr@example.com",
    password: "123456",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-showcase">
        <span className="hero-pill">Analytics Workspace</span>
        <h1 className="display-5 fw-semibold mt-4">
          Bring your team, products, and performance into one polished
          dashboard.
        </h1>
        <p className="lead text-secondary mt-3 mb-0">
          A responsive React dashboard inspired by the provided Figma direction,
          built with Bootstrap, hooks, and a clean service layer.
        </p>
      </div>

      <div className="login-card">
        <div className="mb-4">
          <p className="eyebrow mb-2">Welcome back</p>
          <h2 className="mb-1">Sign in to your workspace</h2>
          <p className="text-secondary mb-0">
            Use the demo credentials already filled in below.
          </p>
        </div>

        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <label className="form-label mb-0">
            <span className="small text-secondary">Email</span>
            <input
              type="email"
              className="form-control form-control-lg mt-2"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>

          <label className="form-label mb-0">
            <span className="small text-secondary">Password</span>
            <input
              type="password"
              className="form-control form-control-lg mt-2"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
            />
          </label>

          {error ? <div className="alert alert-danger py-2 mb-0">{error}</div> : null}

          <button type="submit" className="btn btn-dark btn-lg rounded-pill mt-2">
            Enter dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
