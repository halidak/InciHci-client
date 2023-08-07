import axios from "axios";
import { API_URL } from "../../../env";

export const rate = async (rating, user, product) => {
    try {
        const response = await axios.post(`${API_URL}/ratings/addRating`, {
        rating,
        user,
        product,
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}