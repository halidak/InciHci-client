import React, {createContext} from "react";
import { rate } from "./rate.service";

export const RateProductContext = createContext();

export const RateProductContextProvider = ({children}) => {

    const rateProduct = async (userId, productId, rating) => {
        try {
            const response = await rate(rating, userId, productId);
            return response;
        } catch (err) {
            console.error("Error rating product:", err);
            throw err;
        }
    };

    return (
        <RateProductContext.Provider
            value={{
                rateProduct,
            }}>
            {children}
        </RateProductContext.Provider>
    )
}