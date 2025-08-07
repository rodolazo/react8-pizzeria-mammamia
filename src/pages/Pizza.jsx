import { useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import { CartContext } from "../context/CartContext";

const Pizza = () => {	
	const { id } = useParams(); // captura el ID dinámico de la URL
  const { pizzas, loading } = useContext(PizzaContext); // accede a todas las pizzas
  const { addToCart } = useContext(CartContext); // accede al método para añadir al carrito

  const [precioFormateado, setPrecioFormateado] = useState("");

  const pizza = pizzas.find((p) => p.id === id);

  //De esta manera me aseguro que ya tengo el valor de price
	useEffect(() => {
		if (pizza.price !== undefined) {
			const precio = pizza.price
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    		setPrecioFormateado(precio);
    	}
    }, [pizza]);

	if (loading) return <p>Cargando pizza...</p>;

  if (!pizza) return <p>Pizza no encontrada</p>;

  const navegar = useNavigate();

  return (
  <>
    {pizza.name ? (
    	<div className="cardpizza pizza">
	        <img src={pizza.img} alt={pizza.name} className="cardpizza__img" />
	        <h2 className="cardpizza__title">{`Pizza ${pizza.name}`}</h2>
	        <p className="cardpizza__texto">Ingredientes: </p>
	        <p className="cardpizza__ingredientes">{pizza.ingredients.join(", ")}</p>
	        <p className="cardpizza__precio">{`Precio: $ ${precioFormateado}`}</p>
	        <div className="cardpizza__botones">
	        	<button className="cardpizza__boton" onClick={ () => navegar(-1)}>Volver</button>
	        	<button className="cardpizza__boton cardpizza__boton_comprar"  onClick={ () => addToCart(pizza)}>
	        		Añadir
	        	</button>
	        </div>
        </div>
        ) : (
      	<p>Cargando pizza...</p>
    		)}
  </>
  );

};

export default Pizza;