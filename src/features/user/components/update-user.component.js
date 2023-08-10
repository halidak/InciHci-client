import React, {useContext, useEffect, useState} from "react";
import { Alert, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";
import { 
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title
} from "../../account/components/account.style";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Avatar, Button } from "react-native-paper";
import styled from "styled-components/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


const AvatarContainer = styled.View`
  align-items: center;
`;

export const UpdateUserComponent = ({navigation, capturedImageUri}) => {
    const {user, getUser, isLoading, updateUser} = useContext(AuthContext);
    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [imageIsLoading, setImageIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    //const capturedImageUri = route.params?.capturedImageUri;
    console.log("USER UPDATE COMPOENNT SLIKA", capturedImageUri);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsProfileLoading(true)
          try {
            const response = await getUser(user._id);
            console.log("USER IME", response.firstName);
            setFisrtName(response.firstName);
            setLastName(response.lastName);
            setEmail(response.email);
            setImage(response.image);
            setIsProfileLoading(false)
          } catch (error) {
            console.error("Error fetching user data:", error);
            setIsProfileLoading(false)
          }
        };
        fetchUserData();
        
      }, []);

      useEffect(() => {
        if (capturedImageUri) {
            const source = {
              uri: capturedImageUri,
              type: "image/jpg",
              name: "image.jpg"
            };
            console.log("SLIKA IZ kamere", source);
            handleUpdata(source);
        }
      }, [capturedImageUri])

        const update = async() => {
            try{
               
                let updatedData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    image: image
                    };

                await updateUser(user._id, updatedData);
                navigation.goBack();
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }

      
    const alertOpen = () => {
        Alert.alert(
            "Upload image",
            "Upload product image",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                { text: "Take a photo", onPress: () =>  openCamera() },
                { text: "Choose from gallery", onPress: () => openGallery() }
            ],
            { cancelable: false }
        );
        };

        const openCamera = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted") {
              navigation.navigate("UserCamera", { navigation });
            } else {
              console.log("Camera permission denied");
            }
          };

          const handleUpdata = (photo) => {
            // Postavite isLoading na true dok se slika učitava
            setImageIsLoading(true);
        
            const data = new FormData();
            data.append("file", photo);
            data.append("upload_preset", "InciHci_");
            data.append("cloud_name", "dl7wdm0uj");
            fetch("https://api.cloudinary.com/v1_1/dl7wdm0uj/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("SLIKA ZA SLANJE",data);
                setImage(data.url);
                // Postavite isLoading nazad na false kad se slika učita
                setImageIsLoading(false);
            })
            .catch((err) => {
                Alert.alert("An Error Occurred While Uploading");
                console.log("UPLOAD ERROR",err);
                // Postavite isLoading nazad na false ako dođe do greške
                setImageIsLoading(false);
            });
        }

      

          const openGallery = async () => {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status === "granted") {
                const result = await ImagePicker.launchImageLibraryAsync();
                if (!result.canceled && result.assets.length > 0) {
                    console.log("Selected image", result.assets[0].uri);
                    const source = {
                        uri: result.assets[0].uri,
                        type: "image/jpg",
                        name: "image.jpg"
                    }
                    handleUpdata(source);
                }
            } else {
                console.log("Media library permission denied");
            }
        };

      

      
    console.log("USER",user._id);
    return (
       <AccountBackground>
        <AccountCover/>
        <Title>Update Profile</Title>
        {isProfileLoading &&   <ActivityIndicator animating={true} color="#0000ff" />}
        <AccountContainer>
        <AvatarContainer>
        {user.image ? (
            <Avatar.Image
            size={150}
                source={{ uri: image }}
                backgroundColor="#2182BD"
                />
                ): (
                  <Avatar.Text size={150} label={user.firstName[0]} />
                    )}
        </AvatarContainer>
        <Spacer size="large"/>
            <AuthInput

                label="First Name"
                value={firstName}
                textContentType="name"
                autoCapitalize="none"
                onChangeText={(u) => setFisrtName(u)}
            />
            <Spacer size="large">
            <AuthInput

                label="Last Name"
                value={lastName}
                textContentType="name"
                autoCapitalize="none"
                onChangeText={(u) => setLastName(u)}
            />
            </Spacer>
            <Spacer size="large">
            <AuthInput

                label="Email"
                value={email}
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={(u) => setEmail(u)}
            />
            </Spacer>
            {imageIsLoading ? (
            <ActivityIndicator animating={true} color="#0000ff" />
            ) : (

          <Spacer size="large">
            <Button onPress={alertOpen}>Change image</Button>
          </Spacer>
          )}
          {error && (
          <ErrorContainer size="large">
           <Text style={{color: 'red'}} variant="error">{error}</Text>
          </ErrorContainer>
        )}
          {isLoading || imageIsLoading ? (
                <ActivityIndicator animating={true} color="#0000ff" />
                ) : (
            <Spacer size="large">
            <AuthButton
                icon="lock-open-outline"
                mode="contained"
                onPress={update}
            >
                Update User
            </AuthButton>
            </Spacer>)}
        </AccountContainer>
       </AccountBackground>
    )
}