import React, {useContext, useState} from "react";
import { getProductsByBarCode } from "./scanner.service";

export const ScannerContext = React.createContext();

export const ScannerContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getProducts = async(barCode) => {
        try{
            setIsLoading(true);
            const response = await getProductsByBarCode(barCode);
            console.log("RESPONSE", response);
            setProducts(response);
            setIsLoading(false);
            return response;
        }catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <ScannerContext.Provider
            value={{
                products,
                isLoading,
                error,
                getProducts
            }}
        >
            {children}
        </ScannerContext.Provider>
    )
}