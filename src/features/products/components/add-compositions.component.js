import React, { useContext, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { ProductDetailsContext } from "../../../services/product/product-details.context";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../../account/components/account.style";
import { Spacer } from "../../../components/spacer/spacer.component";

export const AddCompositionsComponent = ({ productId, navigation }) => {
  const { addComp, isLoading } = useContext(ProductDetailsContext); // Ovde koristite useContext
  const [comp, setComp] = useState("");
  const [error, setError] = useState("");
  
  const handleAdd = async () => {
    if (!comp) {
      setError("Input is required");
      return;
    }
    await addComp(productId, comp); // Pravilno pozovite addComp funkciju sa pravim redosledom argumenata
    navigation.goBack();
  };

  console.log("PRODUCT ID IZ ADD COMPOSITIONS", productId);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Add composition</Title>
      <Spacer size="large">
        <AuthInput
          label="composition"
          value={comp}
          onChangeText={(c) => setComp(c)}
        />
        {error && (
          <ErrorContainer size="large">
            <Text style={{ color: "red" }} variant="error">
              {error}
            </Text>
          </ErrorContainer>
        )}
        {!isLoading ? (
          <AuthButton mode="contained" onPress={handleAdd}>
            Add
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color="#0000ff" />
        )}
      </Spacer>
    </AccountBackground>
  );
};
