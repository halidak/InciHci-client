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
        if (error.response.status === 404) {
            throw new Error("User not found");
        } else {
            throw new Error("Email and password do not match");
        }
    }
};

export const registerRequest = async (email, password, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email,
            password,
            firstName,
            lastName,
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error("User already exists");
        } else {
            throw new Error("An error occurred. Please try again later.");
        }
    }
}

export const verifyEmail = async (verificationCode) => {
    try {
        const response = await axios.post(`${API_URL}/verify`, {
            verificationCode,
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error("Invalid verification code");
        } else {
            throw new Error("An error occurred. Please try again later.");
        }
    }
}