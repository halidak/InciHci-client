import React, {useState, useContext} from "react";
import { 
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title
 } from "../components/account.style";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";


export const ResetPasswordScreen = ({navigation, route}) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const { handleResetPassword, isLoading } = useContext(AuthContext);
    const { email } = route.params;

    console.log(code);

    const reset = async () => {
        console.log("Pozivam handleResetPassword");
        if (!code || !newPassword || !confirmPassword) {
            setError("All inputs are required");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        console.log(code)
        console.log(email)
        console.log(newPassword)
    
        try {
            await handleResetPassword(email, parseInt(code, 10), newPassword);
            console.log("Uspješno resetirano!");
            navigation.navigate("Login"); 
        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <AccountBackground>
            <AccountCover />
            <Title>InciHci</Title>
            <AccountContainer>
                <AuthInput
                    label="Code"
                    value={code}
                    textContentType="oneTimeCode" 
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(u) => setCode(u)}
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
                        label="Confirm New Password"
                        value={confirmPassword}
                        textContentType="password"
                        secureTextEntry
                        onChangeText={(u) => setConfirmPassword(u)}
                    />
                </Spacer>
             
                <Spacer size="large">
                    {isLoading ? (
                        <ActivityIndicator animating={true} color="red" />
                    ) : (
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={reset}
                        >
                            Reset Password
                        </AuthButton>
                    )}
                </Spacer>
            </AccountContainer>
        </AccountBackground>
    );
}
