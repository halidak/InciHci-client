import axios from "axios";
import { API_URL } from "../../../env";

export const loginRequest = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}