import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardPizza = ({ pizza: { desc, id, img, ingredients, name, price }, addCarrito }) => {
  const precioFormateado = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const navegar = useNavigate();

  const handleDetalles = () => {
    navegar(`/pizza/${id}`);
  }

  return (
    <div className="cardpizza">
      <img src={img} alt={desc} className="cardpizza__img" />
      <h2 className="cardpizza__title">{`Pizza ${name}`}</h2>
      <p className="cardpizza__texto cardpizza__ingredientes">Ingredientes: </p>
      <ul className="cardpizza__lista">
        {ingredients.map((ingrediente, idx) => (
          <li className="cardpizza__ing" key={idx}>{ingrediente}</li>
        ))}
      </ul>
      <p className="cardpizza__precio">Precio: {`$ ${precioFormateado}`}</p>
      <div className="cardpizza__botones">
        <button className="cardpizza__boton" onClick={handleDetalles}>Ver más</button>
        <button className="cardpizza__boton cardpizza__boton_comprar" onClick={addCarrito}>
          Añadir
        </button>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  pizza: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    img: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addCarrito: PropTypes.func.isRequired,
};

export default CardPizza;
