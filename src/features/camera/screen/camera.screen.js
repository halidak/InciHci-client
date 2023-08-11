import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "react-native";
import { CameraComponent } from "../components/camera.component";
import { ScannerContextProvider } from "../../../services/product/scanner.context";


export const CameraScreen = ({navigation}) => {
    return(
        <SafeArea>
            <ScannerContextProvider>
           <CameraComponent navigation={navigation}/>
            </ScannerContextProvider>
        </SafeArea>
    )
}