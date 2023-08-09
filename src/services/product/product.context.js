import React, { createContext, useState, useEffect } from "react";
import { deleteP, addProduct } from "./product.service";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children, productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const onRefresh = () => {
  //   setIsLoading(true);
  //   getProducts(categoryId)
  //     .then((data) => {
  //       setProducts(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   onRefresh();
  // }, [categoryId]);

  
  const fetchProduct = async (productId) => {
    try {
      setIsLoading(true);
      const response = await getProductById(productId);
      console.log("Fetched product:", response); // Ovdje promijenjen ispis
      setIsLoading(false);
      setProductDetails(response); // Set product details
      return response;
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setIsLoading(true);
      const response = await deleteP(productId);
      setIsLoading(false);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      return response;
    } catch (err) {
      console.error("Error removing product:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const createProduct = async (userId, categoryId, name, description, image, company, barCode) => {
    try {
      setIsLoading(true);
      const response = await addProduct(userId, categoryId, name, description, image, company, barCode);
      setIsLoading(false);
      setProducts((prevProducts) => [...prevProducts, response]);
      return response;
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        fetchProduct,
        productDetails,
        deleteProduct,
        createProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
