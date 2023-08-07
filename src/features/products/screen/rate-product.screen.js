import React from "react";
import { Text } from "react-native";
import { RateProductContextProvider } from "../../../services/rate/rate.context";
import { RateProductComponent } from "../components/rate-product.component";

export const RateProductScreen = ({route, navigation }) => {
    const { productId } = route.params;
    console.log(productId)
    return (
        <RateProductContextProvider>
            <RateProductComponent productId={productId} navigation={navigation}/>
        </RateProductContextProvider>
    )
}