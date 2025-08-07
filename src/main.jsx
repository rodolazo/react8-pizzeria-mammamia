import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import PizzaProvider from './context/PizzaContext.jsx'
import UserProvider from './context/UserContext.jsx'
import CartProvider from "./context/CartContext.jsx";

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <PizzaProvider>
      <CartProvider>
        <BrowserRouter basename="/react8-pizzeria-mammamia">
          <App />
        </BrowserRouter>
      </CartProvider>
    </PizzaProvider>
  </UserProvider>
)
