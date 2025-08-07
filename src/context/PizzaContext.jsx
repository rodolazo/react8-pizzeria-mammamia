import {createContext, useState, useEffect} from 'react';

export const PizzaContext = createContext();

const PizzaProvider = ({children}) => {

	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

    const fetchPizzas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/pizzas'); // Ajusta la ruta si es otra API
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error al cargar pizzas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();

  	}, []);

  return (
    <>
      <PizzaContext.Provider value={{pizzas, loading}}>
      	{children}
      </PizzaContext.Provider>
    </>
  );
};

export default PizzaProvider;