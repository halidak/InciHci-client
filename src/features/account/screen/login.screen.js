import React, { useState, useContext } from "react";
import { Text, ActivityIndicator,TouchableOpacity  } from "react-native";
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

import { Spacer } from "../../../components/spacer/spacer.component";


export const LoginScreen = ({ navigation }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { onAuth, isAuth, handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

    const handleLoginPress = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        try{
            setIsLoading(true);
            await handleLogin(email, password);
            setIsLoading(false);
            console.log("Success")
            navigation.navigate("Category");
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.message === "User not found") {
                setError("Invalid email or password.");
            } else {
                setError("Invalid email or password.");
            }
            setIsLoading(false);
        }
    }

    return (
        <AccountBackground >
        <AccountCover />
        <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
            />
            </Spacer>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Spacer size="large">
            <Text style={{color: 'blue'}}>Forgot Password?</Text>
            </Spacer>
            </TouchableOpacity>
           {error && (
          <ErrorContainer size="large">
            <Text style={{color: 'red'}} variant="error">{error}</Text>
          </ErrorContainer>
        )}
         <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={handleLoginPress}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true}  color="#0000ff"/>
          )}
        </Spacer>
        </AccountContainer>
        <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
    );
}
