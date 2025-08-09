import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();


const CartProvider = ({children}) => {

	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	const addToCart = (pizza) => {
    setCart(prev => {
      const found = prev.find(item => item.id === pizza.id);
      if (found) {
        return prev.map(item =>
          item.id === pizza.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...pizza, cantidad: 1 }];
      }
    });
  };

   useEffect(() => {
    const nuevoTotal = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    setTotal(nuevoTotal);
  }, [cart]);



  return (
    <>
    	<CartContext.Provider value={{ cart, setCart, total, setTotal, addToCart }}>
    		{children}
    	</CartContext.Provider>
    </>
  );
};

export default CartProvider;