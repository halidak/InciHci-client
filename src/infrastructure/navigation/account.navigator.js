import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screen/account.screen";
import { LoginScreen } from "../../features/account/screen/login.screen";
import { RegisterScreen } from "../../features/account/screen/register.screen";
import { VerifyScreen } from "../../features/account/screen/verify.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        </Stack.Navigator>
    );
};