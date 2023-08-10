import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ChangePasswordComponent } from "../components/change-password.component";


export const ChangePasswordScreen = ({navigation}) => {
    return (
        <SafeArea>
            <ChangePasswordComponent navigation={navigation}/>
        </SafeArea>
    )
}