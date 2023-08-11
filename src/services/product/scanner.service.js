import axios from "axios";
import { API_URL } from "../../../env";

//get products by barCode
export const getProductsByBarCode = async (barCode) => {
    try {
        const response = await axios.get(`${API_URL}/products/barCode/${barCode}`);
        console.log("RESPONSE", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}