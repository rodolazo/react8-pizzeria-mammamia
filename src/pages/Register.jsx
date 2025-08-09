import { useState, useContext,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
	const { register, loading, error, isAuthenticated } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit =  async (e)=>{
  	e.preventDefault();
    setLocalError(null);

    if (!form.email || !form.password) {
      setLocalError("Completa email y contraseña.");
      return;
    }

    try {
      await register({ email: form.email, password: form.password });
      // redirección automática en useEffect
    } catch {
      // el mensaje viene de `error` en el contexto
    }

  }  

  return (
    <div className="container" style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Registrar Usuario</h2>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            autoComplete="email"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {(localError || error) && (
          <p style={{ color: "crimson", marginBottom: 12 }}>
            {localError || error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Login</Link>
      </p>
    </div>
  );



};

export default Register;