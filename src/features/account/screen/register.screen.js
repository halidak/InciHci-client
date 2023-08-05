import React, {useState, useContext} from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
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
import { AuthContext } from "../../../services/auth/auth.context";


export const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {handleRegister} = useContext(AuthContext);

    const onRegister = async (email, password, repeatedPassword, firstName, lastName) => {
        if (!email || !password || !repeatedPassword || !firstName || !lastName) {
            setError("Please enter all inputs.");
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

        if(password != repeatedPassword){
            setError("Passwords do not match.");
            return;
        }

       try {
        setIsLoading(true);
        await handleRegister(email, password, firstName, lastName);
        setIsLoading(false);
        console.log("Success")
        navigation.navigate("Verify");
       }
       catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.message === "User not found") {
            setError("User already exist.");
        } else {
            setError("Invalid email.");
        }
        setIsLoading(false);
       }
    }

    return (
        <AccountBackground>
      <AccountCover />
      <Spacer size="large"/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AccountContainer>
          <AuthInput
            label="First Name"
            value={firstName}
            textContentType="firstName"
            onChangeText={(p) => setFirstName(p)}
          />
        <Spacer size="large">
          <AuthInput
            label="Last Name"
            value={lastName}
            textContentType="lastName"
            onChangeText={(p) => setLastName(p)}
          />
        </Spacer>
        <Spacer size="large">
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        </Spacer>
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
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
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
              onPress={() => onRegister(email, password, repeatedPassword, firstName, lastName)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true}  color="#0000ff" />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
      </ScrollView>
    </AccountBackground>
    );
}
