import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addFavourite, getFavourites } from "./favourites.service";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const loadUser = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const userJSON = JSON.parse(userString);
        setUser(userJSON);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveFavourites = async (userId, productId) => {
    try {
      await addFavourite(userId, productId);
    } catch (err) {
      console.log(err);
    }
  };

  const loadFavourites = async (userId) => {
    try {
      setIsLoading(true);
      const favourites = await getFavourites(userId);
      setFavourites(favourites);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadFavourites(user._id);
    }
  }, [user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isLoading,
        error,
        saveFavourites,
        loadFavourites,
        user
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
