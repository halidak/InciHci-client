import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { UserSettings } from "../components/user-settings.component";


export const CategoryScreen = () => {
    return(
        <SafeArea>
            <UserSettings />
        </SafeArea>
    )
}