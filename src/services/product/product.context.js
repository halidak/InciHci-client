import React, { createContext, useState, useEffect } from "react";
import { getProducts } from "./product.service";
export const ProductContext = createContext();

export const ProductContextProvider = ({ children, categoryId}) => {
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
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                error,
                onRefresh,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
