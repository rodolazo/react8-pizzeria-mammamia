import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar sesión guardada al iniciar la aplicación
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setEmail(savedEmail);
    }
  }, []);

  // Guardar sesión cuando cambien token/email
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [token, email]);

  //Método para el login
  async function login({ email, password }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.message || "No se pudo iniciar sesión.");
      setToken(data.token);
      setEmail(data.email);
      return { token: data.token, email: data.email };
    } catch (err) {
      setToken(null);
      setEmail(null);
      setError(err.message || "Error de red");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Método para registrarme
  const register = async ({email, password}) =>{
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      console.log(data);

      if (!res.ok) throw new Error(data?.message || "No se pudo iniciar sesión.");
      setToken(data.token);
      setEmail(data.email);
      return { token: data.token, email: data.email };
    } catch (err) {
      setToken(null);
      setEmail(null);
      setError(err.message || "Error de red");
      throw err;
    } finally {
      setLoading(false);
    }

  }

  function logout() {
    setToken(null);
    setEmail(null);
    setError(null);
  }

   async function getProfile() {
    if (!token) {
      setError("No hay token, usuario no autenticado.");
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo obtener el perfil.");

      // Se asume que /api/auth/me devuelve { email: "..." }
      setEmail(data.email);
      return data;
    } catch (err) {
      setError(err.message || "Error de red");
      // Si el token ya no es válido, limpiamos sesión
      if (err.message?.toLowerCase().includes("token")) {
        logout();
      }
      return null;
    } finally {
      setLoading(false);
    }
  }






  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const isAuthenticated = Boolean(token);

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        loading,
        error,
        login,
        register,
        logout,
        authHeader,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );


};

export default UserProvider;
