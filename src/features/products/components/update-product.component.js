import React, {useState, useContext, useEffect} from "react";
import { Text, Alert, ActivityIndicator,  } from "react-native";
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
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { ProductDetailsContext } from "../../../services/product/product-details.context";

export const UpdateProductComponent = ({productId, navigation}) => {
    console.log("UPDATE PROFILE PRODUCTid", productId)
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCompany, setProductCompany] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [image, setImage] = useState("");
    const {fetchProduct, isLoading, updateProductDetails} = useContext(ProductDetailsContext);
    const [productIsLoading, setProductIsLoading] = useState(false);
    const [imageIsLoading, setImageIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
          try {
            setProductIsLoading(true);
            const response = await fetchProduct(productId);
            console.log(response);
            setProductName(response.name);
            setProductDescription(response.description);
            setProductCompany(response.company);
            setProductBarcode(response.barCode);
            setProductIsLoading(false);
          } catch (error) {
            console.log(error);
            setProductIsLoading(false);
          }
        }
      
        fetchData();
    }, []);
    
    const updateProduct = async() => {
        try{
            let updatedData = {
                name: productName,
                description: productDescription,
                company: productCompany,
                barCode: productBarcode,
              };
        
              if (image) {
                updatedData.image = image;
              }
              console.log("Product Barcode Before Update:", productBarcode);
            await updateProductDetails(productId, updatedData);
            navigation.goBack();
        }
        catch(err) {
            setError("Error updating product.");
            console.log(err);
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
                { text: "Choose from gallery", onPress: () => openGallery() }
            ],
            { cancelable: false }
        );
        };

        // const openCamera = async () => {
        //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
        //     if (status === "granted") {
        //       navigation.navigate("ProductAddCamera", { navigation });
        //     } else {
        //       console.log("Camera permission denied");
        //     }
        //   };

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

    return (
        <AccountBackground>
            <AccountCover />
            <AccountContainer>
                <Title>Update product</Title>
                {productIsLoading &&  <ActivityIndicator animating={true} color="#0000ff" />}
                <Spacer size="large">
                    <AuthInput 
                        label="Product name"
                        value={productName}
                        onChangeText={(n) => setProductName(n)}
                    />
                </Spacer>
                <Spacer size="large">
                    <AuthInput 
                        label="Product description"
                        value={productDescription}
                        onChangeText={(d) => setProductDescription(d)}
                    />
                </Spacer>
                <Spacer size="large">
                    <AuthInput 
                        label="Product company"
                        value={productCompany}
                        onChangeText={(c) => setProductCompany(c)}
                    />
                </Spacer>
                <Spacer size="large">
                    <AuthInput 
                        label="Product barcode"
                        value={productBarcode}
                        onChangeText={(b) => setProductBarcode(b)}
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
                <AuthButton
                    icon=""
                    mode="contained"
                    onPress={updateProduct}
                >
                    Update Product
                </AuthButton>
                )}
            </AccountContainer>
        </AccountBackground>
    )
}