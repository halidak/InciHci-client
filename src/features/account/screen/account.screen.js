import React from "react";
import { AccountBackground, AccountCover, AccountContainer, AuthButton } from "../components/account.style";
import { Button } from 'react-native-paper';
import { Spacer } from "../../../components/spacer/spacer.component";


export const AccountScreen = ({navigation}) => {
    return(
        <AccountBackground >
            <AccountCover />
            <AccountContainer>
                <AuthButton 
                icon="lock-open-outline"
                mode="contained"
                onPress={()=> navigation.navigate('Login')}>
                    Login
                </AuthButton>
                <AuthButton 
                icon="lock-open-outline"
                mode="contained"
                onPress={()=> navigation.navigate("Register")}>
                    Register
                </AuthButton>
                <Spacer size="large"/>
            </AccountContainer>
        </AccountBackground>
    )
}