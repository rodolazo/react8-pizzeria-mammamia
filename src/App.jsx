import "./App.css";
import { Routes, Route , Navigate} from "react-router-dom";
import { useContext } from "react";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "./context/UserContext.jsx";

function App() {

  const {token } = useContext(UserContext);
  console.log(`Mi token es: ${token}`)
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />                    
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={token?<Profile/>:<Navigate to="/login"></Navigate>} />
          <Route path="/login" element={token?<Navigate to="/"></Navigate>:<Login/>} />
          <Route path="/register" element={token?<Navigate to="/"></Navigate>:<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
