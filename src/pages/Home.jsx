import {useContext} from 'react';
import Header from "../componentes/Header";
import CardPizza from "../componentes/CardPizza";
import { CartContext } from "../context/CartContext";
import { PizzaContext } from '../context/PizzaContext';




const Home = () => {
  const {pizzas, loading} = useContext(PizzaContext);
  const {addToCart} = useContext(CartContext);

  if (loading) return <p>Cargando pizzas...</p>;
  

  return (
      <>        
        <Header/>
        <div className="cards">
          {pizzas.map((item)=>(
            <CardPizza key={item.id} pizza={item} addCarrito={() => addToCart(item)}></CardPizza>
            ))}
        </div>
      </>
    )
  
};

export default Home;
