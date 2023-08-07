import axios from "axios";
import { API_URL } from "../../../env";


export const getFavourites = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/products/likedProducts/${userId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const addFavourite = async (userId, productId) => {
    try {
        const response = await axios.post(`${API_URL}/likes/addLike`, {
            product: productId,
            user: userId
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const UserProducts = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/products/userProducts/${userId}`);
        console.log("User products", response.data);
        return response.data;
    }
    catch (err) {
        console.error('Error fetching user products:', err);
        throw err;
    }
  }