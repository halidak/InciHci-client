import React, { createContext, useState, useEffect } from "react";
import { getCategories } from './category.service';

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onRefresh = () => {
        setIsLoading(true);
        getCategories()
            .then((data) => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                isLoading,
                error,
                onRefresh,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}