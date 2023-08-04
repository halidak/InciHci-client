import React, { createContext, useState, useEffect } from "react";
import { getProductById, AverageRating, fetchCompositions, fetchComments } from "./product-details.service";

export const ProductDetailsContext = createContext();

export const ProductDetailsContextProvider = ({ children, productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [compositions, setCompositions] = useState([]);
  const [comments, setComments] = useState([]);


  const fetchProduct = async (productId) => {
    try {
      setIsLoading(true);
      const response = await getProductById(productId);
      setIsLoading(false);
      setProductDetails(response);
      return response;
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const getRating = async (productId) => {
    try {
      setIsLoading(true);
      const response = await AverageRating(productId);
      setIsLoading(false);
      setRating(response);
      return response;
    } catch (err) {
      console.error("Error fetching product rating by ID:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const getCompositions = async (productId) => {
    try {
      setIsLoading(true);
      const response = await fetchCompositions(productId);
      setIsLoading(false);
      setCompositions(response);
      return response;
    } catch (err) {
      console.error("Error fetching product compositions by ID:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const getComments = async (productId) => {
    try {
      setIsLoading(true);
      const response = await fetchComments(productId);
      setIsLoading(false);
      setComments(response);
      return response;
    } catch (err) {
      console.error("Error fetching product comments by ID:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  }

  useEffect(() => {
    // Pozivamo funkciju getRating unutar useEffect s pravim productId
    getRating(productId);
    getCompositions(productId);
    getComments(productId);
  }, [productId]);

  return (
    <ProductDetailsContext.Provider
      value={{
        isLoading,
        error,
        fetchProduct,
        productDetails,
        rating,
        getRating,
        compositions,
        getCompositions,
        comments,
        getComments
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
};

