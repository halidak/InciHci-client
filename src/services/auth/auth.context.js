import React, {useState, useContext, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest } from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const isAuth = !!user;

    const onAuth = async ({ user, token}) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("token", token);
        setUser(user);
        setToken(token);
    }

    const onLogout = async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    const handleLogin = async (email, password) => {
        try {
          const response = await loginRequest(email, password);
      
          if (response && response.result && response.token) {
            const { result, token } = response;
      
            onAuth({ user: result, token });
          } else {
            console.log("Invalid response from the server.");
          }
        } catch (err) {
          console.log(err);
        }
      };
      

    return (
        <AuthContext.Provider 
        value = {{ 
            user, 
            token, 
            onAuth, 
            onLogout,
            isAuth,
            handleLogin
            }}>
            {children}
        </AuthContext.Provider>
    )
}