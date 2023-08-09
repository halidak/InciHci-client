import React, { createContext, useState, useEffect } from "react";
import { getProducts } from "./type-product.service";

export const TypeProductContext = createContext();


export const TypeProductContextProvider = ({ children, categoryId, productId }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const onRefresh = () => {
      setIsLoading(true);
      getProducts(categoryId)
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      onRefresh();
    }, [categoryId]);
  
    
   
  
    return (
      <TypeProductContext.Provider
        value={{
          products,
          isLoading,
          error,
          onRefresh,
        }}
      >
        {children}
      </TypeProductContext.Provider>
    );
  };
  
