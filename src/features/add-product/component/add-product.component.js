import React, {useContext, useState, useEffect} from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, Alert, PermissionsAndroid, ActivityIndicator } from "react-native";
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


    // if(capturedImageUri){
    //     setImage(capturedImageUri);
    // }
    useEffect(() => {
        // Initialize image state with capturedImageUri if available
        const capturedImageUri = route.params?.capturedImageUri;
        if (capturedImageUri) {
          setImage(capturedImageUri);
        }
      }, []);

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

        // //open camera function
        // const openCamera = async () => {
        //     try {
        //         const granted = await PermissionsAndroid.request(
        //             PermissionsAndroid.PERMISSIONS.CAMERA,
        //             {
        //                 title: "Cool Photo App Camera Permission",
        //                 message:
        //                     "Cool Photo App needs access to your camera " +
        //                     "so you can take awesome pictures.",
        //                 buttonNeutral: "Ask Me Later",
        //                 buttonNegative: "Cancel",
        //                 buttonPositive: "OK"
        //             }
        //         );
        //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             console.log("You can use the camera");
        //         } else {
        //             console.log("Camera permission denied");
        //         }
        //     } catch (err) {
        //         console.warn(err);
        //     }
        // };
        const openCamera = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted") {
              navigation.navigate("ProductAddCamera", { navigation });
            } else {
              console.log("Camera permission denied");
            }
          };

        // //open gallery function
        // const openGallery = async () => {
        //     try {
        //         const granted = await PermissionsAndroid.request(
        //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //             {
        //                 title: "Cool Photo App Read Storage Permission",
        //                 message:
        //                     "Cool Photo App needs access to your storage " +
        //                     "so you can take awesome pictures.",
        //                 buttonNeutral: "Ask Me Later",
        //                 buttonNegative: "Cancel",
        //                 buttonPositive: "OK"
        //             }
        //         )
        //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             console.log("You can use the gallery");
        //         } else {
        //             console.log("Gallery permission denied");
        //         }
        //     } catch (err) {
        //         console.warn(err);
        //     }
        // };

        const openGallery = async () => {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status === "granted") {
              const result = await ImagePicker.launchImageLibraryAsync();
              if (!result.cancelled) {
                console.log("Selected image", result.uri);
                setImage(result.uri);
              }
            } else {
              console.log("Media library permission denied");
            }
          };
          //userId, categoryId, name, description, image, company, barCode

const addProduct = async () => {
    if(!name || !barCode || !description || !image || !company || !checked){
        setError("All fields must be filled");
        return;
    }
    const response = await createProduct(user._id, checked, name, description, image, company, barCode);
    console.log(response);
    setChecked('');
    setName('');
    setDescription('');
    setCompany('');
    setBarCode('');
    setImage('');
    navigation.navigate("ProductDetails", {
        productId : response.product["_id"]
    })
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
            <Button onPress={alertOpen}>Add image</Button>
          </Spacer>
          <Spacer size="large">
          {error && (
          <ErrorContainer size="large">
           <Text style={{color: 'red'}} variant="error">{error}</Text>
          </ErrorContainer>
        )}
          {!isLoading ? (
            <AuthButton
              icon=""
              mode="contained"
              onPress={addProduct}
            >
              Add Product
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true}  color="#0000ff" />
          )}
        </Spacer>
            </AccountContainer>
        </ScrollView>
       </AccountBackground>
    );
}