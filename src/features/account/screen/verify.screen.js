import React, { useState, useContext } from "react";
import { 
    AccountBackground, 
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
 } from "../components/account.style";

import { Spacer } from "../../../components/spacer/spacer.component";
import { ActivityIndicator , Text} from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";

export const VerifyScreen = ({navigation}) => {
    const [code, setCode] = useState(0);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { handleVerify } = useContext(AuthContext);

    const verifyEmail = async (code) => {
        if (!code) {
            setError("Please enter the verification code.");
            return;
        }
        try{
            setIsLoading(true);
            await handleVerify(code);
            setIsLoading(false);
            console.log("Success")
            navigation.navigate("Login");
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.message === "Invalid code") {
                setError("Invalid code.");
            } else {
                setError("Invalid code.");
            }
            setIsLoading(false);
        }
    }

    return (
        <AccountBackground>
            <AccountCover />
            <AccountContainer>
            <AuthInput
            label="Verification code"
            value={code}
            textContentType="oneTimeCode" 
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(c) => setCode(c)}
            />
              {error && (
          <ErrorContainer size="large">
            <Text style={{color: 'red'}} variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => verifyEmail(code)}
            >
              Verify Email
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color="#0000ff" />
          )}
        </Spacer>
            </AccountContainer>
        </AccountBackground>
    )
}