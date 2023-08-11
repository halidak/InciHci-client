import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ScannedProductsComponent } from "../../features/camera/components/scanned-products.component";
import { CameraScreen } from "../../features/camera/screen/camera.screen";

const CameraStack = createStackNavigator();

export const CameraNavigator = () => {
    return (
        <CameraStack.Navigator headerMode="none">
        <CameraStack.Screen name="Camera" component={CameraScreen} />
        <CameraStack.Screen
            name="ScannedProducts"
            component={ScannedProductsComponent}
        />
        </CameraStack.Navigator>
    );
    }