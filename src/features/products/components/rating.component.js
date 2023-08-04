import React from "react";
import { View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";


export const RatingComponent = ({ rating }) => {
  const numStars = Math.round(parseFloat(rating.averageRating));
  console.log(numStars)

  if(isNaN(parseFloat(rating.averageRating)))  {
      return <Text>No one rated this product yet</Text>;
    }
    
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(
      <SvgXml
        key={i}
        xml={star}
        width={20}
        height={20}
      />
    );

  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};
