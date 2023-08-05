import axios from "axios";
import { API_URL } from "../../../env";

export const loginRequest = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("User not found");
        } else {
            throw new Error("Email and password do not match");
        }
    }
};