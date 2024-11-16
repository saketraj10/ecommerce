import { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";

const CartContext = createContext({});

export function useCartContext() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cartProducts))
  },[cartProducts])
  useEffect(()=>{
    if(ls && ls.getItem("cart")){
      const ct = ls.getItem('cart')
        setCartProducts(JSON.parse(ct))
    }
  },[])
  function addProduct(id) {
    setCartProducts((prev) => [...prev, id]);
  }
  function removeProduct(id){
    setCartProducts((prev) => {
      const pos = prev.indexOf(id)
      if(pos !== -1){
        return  prev.filter((item,index) => index !== pos)
      }
  })}
  return (
    <CartContext.Provider value={{ cartProducts, addProduct,removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}
