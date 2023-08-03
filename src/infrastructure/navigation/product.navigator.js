import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { CategoryScreen } from "../../features/products/screen/category.screen";
import { ProductsScreen } from "../../features/products/screen/products.screen";

const Stack = createStackNavigator();

export const ProductNavigator = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
);
