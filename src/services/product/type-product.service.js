import axios from "axios";
import { API_URL } from '../../../env';

export const getProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/products/getByType/${categoryId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};