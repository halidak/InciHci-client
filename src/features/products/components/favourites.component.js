import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { FavouritesContext } from "../../../services/favourites/favourites.context";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ productId }) => {
  const { favourites, saveFavourites, user, loadFavourites, isLoading } = useContext(FavouritesContext);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    loadFavourites(user._id);
  }, []);

  useEffect(() => {
    if (favourites.likedProducts && favourites.likedProducts.length > 0) {
      const found = favourites.likedProducts.some((product) => product._id === productId);
      setIsFavourite(found);
    }
  }, [favourites.likedProducts, productId]);

  const handlePress = async () => {
    setIsFavourite((prevState) => !prevState);

    await saveFavourites(user._id, productId);
    loadFavourites(user._id);
  };

  return (
    <FavouriteButton onPress={handlePress}>
      {isLoading ? ( 
        <ActivityIndicator size="small" color="red" />
      ) : (
        <AntDesign
          name={isFavourite ? "heart" : "hearto"}
          size={24}
          color={isFavourite ? "red" : "red"}
        />
      )}
    </FavouriteButton>
  );
};
