import React, {useState, useContext} from "react";
import { Text, ActivityIndicator } from "react-native";
import { 
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title 
} from "../../account/components/account.style";
import { AuthContext } from "../../../services/auth/auth.context";
import { Spacer } from "../../../components/spacer/spacer.component";

export const ChangePasswordComponent = ({navigation}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState("");
    const {isLoading, user, handlePasswordChange} = useContext(AuthContext);

    const change = async() => {
        if(newPassword !== newPasswordRepeat){
            setError("Passwords don't match");
            return;
        }
        if(!oldPassword || !newPassword || !newPasswordRepeat){
            setError("All inputs are required");
            return;
        }

        try{
            await handlePasswordChange(user._id, oldPassword, newPassword);
            navigation.goBack();
        }
        catch(error){
            setError(error.message);
        }
    }

    return (
        <AccountBackground>
            <AccountCover />
            <Title>Change Password</Title>
            <AccountContainer>
                <AuthInput
                    label="Old Password"
                    value={oldPassword}
                    textContentType="password"
                    secureTextEntry
                    onChangeText={(u) => setOldPassword(u)}
                />
                <Spacer size="large">
                    <AuthInput
                        label="New Password"
                        value={newPassword}
                        textContentType="password"
                        secureTextEntry
                        onChangeText={(u) => setNewPassword(u)}
                    />
                </Spacer>
                <Spacer size="large">
                    <AuthInput
                        label="Repeat New Password"
                        value={newPasswordRepeat}
                        textContentType="password"
                        secureTextEntry
                        onChangeText={(u) => setNewPasswordRepeat(u)}
                    />
                </Spacer>
                {error && <Spacer size="large">
                    <ErrorContainer>
                        <Text>{error}</Text>
                    </ErrorContainer>
                </Spacer>}
                {!isLoading ? (<Spacer size="large">
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={change}
                        disabled={isLoading}
                    >
                        Change Password
                    </AuthButton>
                </Spacer>) : 
                <ActivityIndicator size="large" color="#0000ff" />}
            </AccountContainer>
        </AccountBackground>
    )
}