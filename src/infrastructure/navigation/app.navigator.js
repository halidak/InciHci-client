import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { CameraScreen } from "../../features/camera/screen/camera.screen";

import { ProductNavigator } from "./product.navigator";

import { AccountNavigator } from "./account.navigator";

import { AuthContext } from "../../services/auth/auth.context";

import { AddProductScreen } from "../../features/add-product/screen/add-product.screen";

import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Camera: "camera-outline",
    Account: "person-outline",
    Category: "list-outline",
    Settings: "settings",
    Add: "add"
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
    const { isAuth } = useContext(AuthContext);
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
                {isAuth ? (
                    <Tab.Screen name="Add" component={AddProductScreen} />
                ) : null}
                {isAuth ? (
                    <Tab.Screen name="Settings" component={SettingsNavigator} />
                    ) : (
                    <Tab.Screen name="Account" component={AccountNavigator} />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    );
}