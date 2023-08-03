import axios from "axios";
import { API_URL } from '../../../env';


export const getProducts = async (categoryId) => {
    try {
        const response = await new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}/products/getByType/${categoryId}`)
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
            console.error('Error fetching products:', err);
          }
        };


