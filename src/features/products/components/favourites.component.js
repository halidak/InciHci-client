import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";


const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = () => {
    const [isFavourite, setIsFavourite] = useState(false);
  return (
    <FavouriteButton>
      <AntDesign name={
            isFavourite ? "heart" : "hearto"
      } size={24} color={
            isFavourite ? "red" : "red"
      } />
    </FavouriteButton>
  );
};