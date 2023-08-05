import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { CameraScreen } from "../../features/camera/screen/camera.screen";
import { AccountScreen } from "../../features/account/screen/account.screen";
import { CategoryScreen } from "../../features/products/screen/category.screen";

import { ProductNavigator } from "./product.navigator";

import { AccountNavigator } from "./account.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Camera: "camera-outline",
    Account: "person-outline",
    Category: "list-outline",
}

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
    };
}

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={createScreenOptions}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                }}
            >
                <Tab.Screen name="Category" component={ProductNavigator}  options={{ headerShown: false }} />
                <Tab.Screen name="Camera" component={CameraScreen} />
                <Tab.Screen name="Account" component={AccountNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}