import axios from "axios";
import { API_URL } from '../../../env';

// get product by id
export const getProductById = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/products/getById/${productId}`);
      // console.log("Product", response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      throw err;
    }
  };

  export const AverageRating = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/ratings/averageRating/${productId}`);
        console.log("Average rating", response.data);
        return response.data;
    }
    catch (err) {
        console.error('Error fetching average rating:', err);
        throw err;
    }
  }

  export const fetchCompositions = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/compositions/getCompositions/${productId}`);
        console.log("Compositions", response.data);
        return response.data;
    }
    catch (err) {
        console.error('Error fetching compositions:', err);
        throw err;
    }
  }

  export const fetchComments = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/comments/getComments/${productId}`);
        console.log("Comments", response.data);
        return response.data;
    }
    catch (err) {
        console.error('Error fetching comments:', err);
        throw err;
    }
  }

  //add comment
 export const sendComment = async (userId, productId, content) => {
    try {
      const response = await axios.post(`${API_URL}/comments/addComment`, {
        content,
        product: productId,
        user: userId,
      });
      console.log("Comment added", response.data);
      return response.data;
    } catch (err) {
      console.error("Error adding comment:", err);
      throw err;
    }
  };


export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${API_URL}/comments/removeComment/${commentId}`);
        console.log("Comment deleted", response.data);
        return response.data;
    }
    catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
}

export const addCompositions = async (name, productId) => {
  try{
    const response = await axios.post(`${API_URL}/compositions/addComposition`, {
      name,
      product: productId,
    });
    console.log("Composition added", response.data);
    return response.data;
  }    
  catch (err) {
        console.error('Error adding composition:', err);
        throw err;
    }
}

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/products/update/${productId}`, updatedData);
    console.log("Product updated", response.data);
    return response.data;
  }
  catch (err) {
    console.error('Error updating product:', err);
    throw err;
  }
}


