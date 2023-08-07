import React, {useState, useContext, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest, registerRequest, verifyEmail } from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const isAuth = !!user;
    const [logged, setIsLogged] = useState(false);

    const onAuth = async ({ user, token}) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("token", token);
        setUser(user);
        setToken(token);
        setIsLogged(true);
    }

    const onLogout = async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setIsLogged(false);
    }

    const handleLogin = async (email, password) => {
        try {
          const response = await loginRequest(email, password);
      
          if (response && response.result && response.token) {
            const { result, token } = response;
      
            onAuth({ user: result, token });
          } else {
            throw new Error("Invalid response from the server.");
          }
        } catch (err) {
          if (err.response && err.response.status === 400 && err.response.data.message === "Invalid credentials") {
            throw new Error("Invalid email or password.");
          } else if (err.response && err.response.status === 404 && err.response.data.message === "User does not exist") {
            throw new Error("User does not exist.");
          } else {
            throw new Error("An error occurred. Please try again later.");
          }
        }
      };

      const handleRegister = async (email, password, firstName, lastName) => {
        try {
            const isRegistered = await registerRequest(email, password, firstName, lastName);

            if (isRegistered) {
              console.log("Registration successful. A confirmation message has been sent.");
            } else {
              throw new Error("User already exists.");
            }
        } catch (err) {
          if (err.response && err.response.status === 400 && err.response.data.message === "User already exists") {
            throw new Error("User already exists.");
          } else {
            throw new Error("An error occurred. Please try again later.");
          }
        }
      }

      const handleVerify = async (verificationCode) => {
        try {
          const response = await verifyEmail(verificationCode);
      
          if (response) {
            console.log("Verification successful.");
          } else {
            throw new Error("Invalid response from the server.");
          }
        } catch (err) {
          if (err.response && err.response.status === 400 && err.response.data.message === "Invalid verification code") {
            throw new Error("Invalid verification code.");
          } else {
            throw new Error("An error occurred. Please try again later.");
          }
        }
      }

    return (
        <AuthContext.Provider 
        value = {{ 
            user, 
            token, 
            onAuth, 
            onLogout,
            isAuth,
            handleLogin,
            handleRegister,
            handleVerify,
            logged
            }}>
            {children}
        </AuthContext.Provider>
    )
}