import React from "react";
import { ProductDetailsContextProvider } from "../../../services/product/product-details.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { UpdateProductComponent } from "../components/update-product.component";

export const UpdateProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    return (
        <SafeArea>
        <ProductDetailsContextProvider productId={productId}>
            <UpdateProductComponent productId={productId} navigation={navigation} />
        </ProductDetailsContextProvider>
        </SafeArea>
    );
}