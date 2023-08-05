import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "react-native";
import { AccountBackground , AccountCover} from "../components/account.style";


export const RegisterScreen = () => {
    return (
        <AccountBackground >
            <AccountCover />
        </AccountBackground>
    );
}
