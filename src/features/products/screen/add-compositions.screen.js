import React from "react";
import { AddCompositionsComponent } from "../components/add-compositions.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsContextProvider } from "../../../services/product/product-details.context";

export const AddCompositionsScreen = ({ navigation, route }) => {
    const { productId } = route.params;
    return (
        <ProductDetailsContextProvider productId={productId}>
        <SafeArea>
        <AddCompositionsComponent productId={productId} navigation={navigation} />
        </SafeArea>
        </ProductDetailsContextProvider>
    );
    }