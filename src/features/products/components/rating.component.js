import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";


export const RatingComponent = ({ rating }) => {
  // Konvertiramo rating u cijeli broj kako bismo znali koliko zvjezdica prikazati
  const numStars = Math.round(parseFloat(rating.averageRating));

  // Kreiramo niz s JSX elemetima koji predstavljaju zvjezdice
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(
      <SvgXml
        key={i}
        xml={star}
        width={20} // Prilagodite veličinu zvjezdica prema potrebi
        height={20}
      />
    );
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};
