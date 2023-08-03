import axios from "axios";
import { API_URL } from '../../../env';

export const getCategories = async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/types/getTypes`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
};
