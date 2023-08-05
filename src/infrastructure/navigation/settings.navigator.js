import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { UserScreen } from "../../features/user/screen/user.screen";

import { UserFavouritesScreen } from "../../features/user/screen/user-favourites.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
    return (
        <SettingsStack.Navigator headerMode="none">
            <SettingsStack.Screen name="Settings" component={UserScreen} />
            <SettingsStack.Screen name="UserFavourites" component={UserFavouritesScreen} />
        </SettingsStack.Navigator>
    );
}