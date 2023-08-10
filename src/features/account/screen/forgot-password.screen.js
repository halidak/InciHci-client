import React, {useContext} from "react";
import { AuthContext } from "../../../services/auth/auth.context";
import { 
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title
} from "../components/account.style";
import { ActivityIndicator } from "react-native-paper";

export const ForgotPasswordScreen = ({navigation}) => {
    const {handleForgotPassword, error, isLoading} = useContext(AuthContext);
    const [email, setEmail] = React.useState("");

    const forgot = async() => {
        if(!email){
            return;
        }
        await handleForgotPassword(email);
        navigation.navigate("ResetPassword", {email: email});
    }

    return (
        <AccountBackground>
            <AccountCover />
            <Title>InciHci</Title>
            <AccountContainer>
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(u) => setEmail(u)}
                />
                <ErrorContainer>
                    {error && <Title>{error}</Title>}
                </ErrorContainer>
                {!isLoading ? (
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={forgot}
                    >
                        Send Reset Password Link
                    </AuthButton>
                ) : (
                    <ActivityIndicator animating={true} color="#0000ff" />
                )}
            </AccountContainer>
            <AuthButton mode="contained" onPress={() => navigation.goBack()}>
                Back
            </AuthButton>
        </AccountBackground>
    );
}
