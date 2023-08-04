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