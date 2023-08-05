import React from "react";
import { AddProductForm } from "../component/add-product.component";
import {SafeArea} from "../../../components/utility/safe-area.component";

export const AddProductScreen = () => {
    return (
        <SafeArea>
            <AddProductForm />
        </SafeArea>
    )
}