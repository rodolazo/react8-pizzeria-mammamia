import { useContext } from "react";
import { Button } from 'react-bootstrap';
import { CartContext } from "../context/CartContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart, total, setTotal } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();


  const handleCantidad = (index, accion) => {
    const nuevoCart = [...cart];
    const item = nuevoCart[index];

    switch (accion) {
      case "sumar":
        item.cantidad += 1;
        break;
      case "restar":
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
          nuevoCart.splice(index, 1);
        }
        break;
      case "eliminar":
        nuevoCart.splice(index, 1);
        break;
      default:
        break;
    }

    setCart([...nuevoCart]);
  };

  const handleInputCantidad = (e, index) => {
    const valor = parseInt(e.target.value) || 0;
    const nuevoCart = [...cart];

    if (valor <= 0) {
      nuevoCart.splice(index, 1);
    } else {
      nuevoCart[index].cantidad = valor;
    }

    setCart([...nuevoCart]);
  };


  const enviarCarrito = async ()=>{
    const res = await fetch("http://localhost:5000/api/checkouts",{
      method: "POST",
      headers: {
          "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify(cart)
    });

    const data = await res.json();
    console.log(data);
    alert(data.message);
    setCart([])
    navigate("/");
  };


  return (
    <section className="cart">
      <h2 className="cart__titulo">Tu Carrito</h2>
      <ul className="cart__lista">
        {cart.map((item, index) => (
          <li className="cart__elemento" key={item.id}>
            <img src={item.img} className="cart__imagen" alt={item.name} />
            <div className="cart__details">
              <h3 className="cart__nombre">Pizza {item.name}</h3>
              <p className="cart__precio">Precio: €{item.price}</p>
            </div>
            <div>
              <label className="cart__label">Cantidad: </label>
              <input
                className="cart__input cart__input_cantidad"
                type="number"
                onChange={(e) => handleInputCantidad(e, index)}
                value={item.cantidad}
                min="0"
              />
            </div>
            <div className="cart__botones">
              <Button className="btn btn-secondary" onClick={() => handleCantidad(index, "sumar")}>+</Button>
              <Button className="btn btn-secondary" onClick={() => handleCantidad(index, "restar")}>-</Button>
              <Button className="btn btn-secondary" onClick={() => handleCantidad(index, "eliminar")}>X</Button>
            </div>
            <div>
              <label className="cart__label">Precio: </label>
              <input
                readOnly
                className="cart__input cart__input_precio"
                type="number"
                value={(item.price * item.cantidad).toFixed(2)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="cart__resumen">
        <p>Total: <span id="total">{`Total: $ ${total.toLocaleString("es-ES")}`}</span></p>
        <Button disabled={total===0} className="btn btn-dark" onClick={enviarCarrito}>Finalizar compra</Button>
      </div>
    </section>
  );
};

export default Cart;
