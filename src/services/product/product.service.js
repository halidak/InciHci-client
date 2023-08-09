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

export const deleteP = async (productId) => {
  try {
      const response = await axios.delete(`${API_URL}/products/delete/${productId}`);
      console.log("Product deleted", response.data);
      return response.data;
  }
  catch (err) {
      console.error('Error deleting product:', err);
      throw err;
  }
}

export const addProduct = async (userId, categoryId, name, description, image, company, barCode) => {
  try {
    const response = await axios.post(`${API_URL}/products/create`, {
      user: userId,
      type: categoryId,
      name,
      description,
      image,
      company,
      barCode
    });
    console.log("Product added", response.data);
    return response.data;
  } catch (err) {
    console.error('Error adding product:', err);
    throw err;
  }
}

