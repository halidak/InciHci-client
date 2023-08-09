import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddProductScreen } from "../../features/add-product/screen/add-product.screen";
import { CameraComponent } from "../../features/add-product/component/camera-add.component";


const AddProductStack = createStackNavigator();

export const AddProductNavigator = () => (
    <AddProductStack.Navigator headerMode="none">
        <AddProductStack.Screen name="AddProduct" component={AddProductScreen}  />
        <AddProductStack.Screen name="ProductAddCamera" component={CameraComponent}/>
    </AddProductStack.Navigator>
);
