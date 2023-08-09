import React from "react";
import { AddProductForm } from "../component/add-product.component";
import {SafeArea} from "../../../components/utility/safe-area.component";
import { ProductContextProvider } from "../../../services/product/product.context";

export const AddProductScreen = ({navigation, route}) => {
    return (
        <SafeArea>
            <ProductContextProvider>
            <AddProductForm navigation={navigation} route={route}/>
            </ProductContextProvider>
        </SafeArea>
    )
}