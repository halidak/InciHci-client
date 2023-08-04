import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsComponent } from "../components/product-details.component";
import { ProductDetailsContextProvider } from "../../../services/product/product-details.context";
import { useRoute } from "@react-navigation/native";

export const ProductDetailsScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    return (
        <ProductDetailsContextProvider productId={productId}>
        <SafeArea>
           <ProductDetailsComponent productId={productId}/>
        </SafeArea>
        </ProductDetailsContextProvider>
    );
};
