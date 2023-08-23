import React, {useContext, useState, useEffect} from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, Alert, PermissionsAndroid, ActivityIndicator, Image } from "react-native";
import { 
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
    DescInput
 } from "../../account/components/account.style";

 import { Spacer } from "../../../components/spacer/spacer.component";
 import { Button, RadioButton } from "react-native-paper";
 import { CategoryContext } from "../../../services/category/category.context";
 import * as Permissions from "expo-permissions";
 import * as ImagePicker from "expo-image-picker";
 import { launchCamera } from "react-native-image-picker";
 import { ProductContext } from "../../../services/product/product.context";
 import { AuthContext } from "../../../services/auth/auth.context";
 import { useFocusEffect } from "@react-navigation/native";
 import { FontAwesome } from '@expo/vector-icons';


export const AddProductForm = ({navigation, route}) => {
    const [checked, setChecked] = useState('first');
    const {categories} = useContext(CategoryContext);
    const capturedImageUri = route.params?.capturedImageUri;
    const {createProduct, isLoading} = useContext(ProductContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [barCode, setBarCode] = useState("");
    const {user} = useContext(AuthContext);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [imageIsLoading, setImageIsLoading] = useState(false);


    useEffect(() => {
        //const capturedImageUri = route.params?.capturedImageUri;
        console.log("ADD PRODUCT SLIKA", capturedImageUri);
      
        if (capturedImageUri) {
          const source = {
            uri: capturedImageUri,
            type: "image/jpg",
            name: "image.jpg"
          };
          console.log("SLIKA IZ kamere", source);
          handleUpdata(source);
        //setImage(capturedImageUri)
        }
      }, [capturedImageUri]);

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
    



    //console.log("Captured image URI:", capturedImageUri);

   // console.log("KATEGORIJE" ,categories);

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
              navigation.navigate("ProductAddCamera", { navigation });
            } else {
              console.log("Camera permission denied");
            }
          };

      

          const openGallery = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            } 
            else {
                console.log("Media library permission denied");
            }
        };
        
          //userId, categoryId, name, description, image, company, barCode

          const addProduct = async () => {
            if (!name || !barCode || !description || !company || !checked) {
                setError("All fields must be filled");
                return;
            }
            
            if (image) {
                try {
                    
                    //const uploadedImageUrl = await handleUpdata(image);
                    //setImageUrl(uploadedImageUrl);
                    const response = await createProduct(user._id, checked, name, description, image, company, barCode);
                    
                    console.log(response);
                    
                    setChecked('');
                    setName('');
                    setDescription('');
                    setCompany('');
                    setBarCode('');
                    setImage('');
                    
                    navigation.navigate("ProductDetails", {
                        productId: response.product["_id"]
                    });
                } catch (error) {
                    console.error("Error uploading image:", error);
                    setError("An error occurred while uploading the image");
                }
            } else {
                setError("Please select an image");
            }
        }
        
   return (
       <AccountBackground>
        <AccountCover/>
        <Spacer size="large"/>
        <Title>Add product</Title>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AccountContainer>
                <AuthInput
                    label="Product name"
                    placeholder="Enter product name"
                    value={name}
                    onChangeText={(n) => setName(n)}
                    />
                <Spacer size="large">
                <DescInput
                    label="Product description"
                    placeholder="Enter product description"
                    value={description}
                    onChangeText={(d) => setDescription(d)}
                    />
                </Spacer>
                <Spacer size="large">
                <AuthInput
                    label="Product company"
                    placeholder="Enter product company"
                    value={company}
                    onChangeText={(c) => setCompany(c)}
                    />
                </Spacer>
                <Spacer size="large">
                <AuthInput
                    label="Product barcode"
                    placeholder="Enter product barcode"
                    value={barCode}
                    onChangeText={(b) => setBarCode(b)}
                    />
                </Spacer>
                <Spacer size="large">
            <Text>Choose a type:</Text>
            {categories.map((category) => (
              <View key={category._id} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value={category._id}
                  status={checked === category._id ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(category._id);
                  }}
                />
                <Text>{category.name}</Text>
              </View>
            ))}
          </Spacer>
          <Spacer size="large">
  {imageIsLoading ? (
    <ActivityIndicator animating={true} color="#0000ff" />
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {image ? (
        <FontAwesome name="check" size={20} color="green" style={{ marginRight: 10 }} />
      ) : null}
      <Button onPress={alertOpen}>Add image</Button>
    </View>
  )}
</Spacer>

          <Spacer size="large">
          {error && (
          <ErrorContainer size="large">
           <Text style={{color: 'red'}} variant="error">{error}</Text>
          </ErrorContainer>
        )}
          {isLoading || imageIsLoading ? (
                <ActivityIndicator animating={true} color="#0000ff" />
                ) : (
                <AuthButton
                    icon=""
                    mode="contained"
                    onPress={addProduct}
                >
                    Add Product
                </AuthButton>
                )}
        </Spacer>
            </AccountContainer>
        </ScrollView>
       </AccountBackground>
    );
}