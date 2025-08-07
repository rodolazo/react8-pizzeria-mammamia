import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Leer el valor guardado en localStorage o asumir `true` por defecto
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token");

    if (stored === null) {
      // Primera vez que abre la app → lo dejamos como `true`
      localStorage.setItem("token", "true");
      return true;
    }

    return stored === "true"; // Convertimos string a boolean
  });

  //Lo usare más adelante para el login
  const login = () => {
    localStorage.setItem("token", "true");
    setToken(true);
  };

  
  const logout = () => {
    localStorage.setItem("token", "false");
    setToken(false);
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
