import React, { createContext, useState, useEffect } from "react";
import { getProductById, AverageRating, fetchCompositions, fetchComments, sendComment, deleteComment, addCompositions, updateProduct } from "./product-details.service";

export const ProductDetailsContext = createContext();

export const ProductDetailsContextProvider = ({ children, productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [compositions, setCompositions] = useState([]);
  const [comments, setComments] = useState([]);
  const [rateArray, setRateArray] = useState([]);


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

  const addComment = async (userId, productId, content) => {
    try {
      setIsLoading(true);
      const response = await sendComment(userId, productId, content);
      setIsLoading(false);
      return response;
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const removeComment = async (commentId) => {
    try {
      setIsLoading(true);
      const response = await deleteComment(commentId);
      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      setIsLoading(false);
      return response;
    } catch (err) {
      console.error("Error removing comment:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  }

  const addComp = async (productId, compositions) => {
    try{
      setIsLoading(true);
      const response = await addCompositions(compositions, productId);
      setIsLoading(false);
      return response;
    }
    catch (err) {
      console.error("Error adding composition:", err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  }

  const updateProductDetails = async(productId, updatedData) => {
    try{
      setIsLoading(true);
      const response = await updateProduct(productId, updatedData);
      setIsLoading(false);
      return response;
    }
    catch (err) {
      console.error("Error updating product:", err);
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
        getComments,
        addComment,
        setComments,
        removeComment,
        addComp,
        updateProductDetails
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
};

