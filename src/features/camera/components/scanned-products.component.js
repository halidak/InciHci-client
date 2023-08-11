import React, {useContext} from "react";
import { Text, ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage } from "../../products/components/product.style";
import { AuthContext } from "../../../services/auth/auth.context";
import { ScannerContext } from "../../../services/product/scanner.context";


export const ScannedProductsComponent = ({route, navigation}) => {
    const { products, isLoading, error } = route?.params;
    const { isAuth } = useContext(AuthContext);

    if (error) {
        return <Text>Error: {error.message}</Text>;
      }
    
      // Check if isLoading is true
      if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
    
      if (products.length === 0) {
        return <EmptyProductMessage><Text>No products available.</Text></EmptyProductMessage>;
      }
      
        const handleProductPress = (productId) => {
            navigation.navigate("ProductDetails", { productId });
        };

        const applyCacheBust = (imageUrl) => {
            const cacheBust = Date.now();
            return imageUrl ? `${imageUrl.replace("/upload/", "/upload/q_20/")}?cache=${cacheBust}` : null;
          };
    

    console.log("SCANNED PRODUCTS", products);
    return (
       <>
        <ProductScrollView>
        {products.map((product) => (
          <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
            <ProductCard elevation={5} key={product._id}>
              <View>
                {isAuth ? 
                <Favourite productId={product._id}/> : null
                }
               <RestaurantCardCover source={{ uri: applyCacheBust(product.image) }} />
              </View>
              <Info>
                <Title>{product.name}</Title>
                <Open>
                  <Row>
                    <Text>{product.company}</Text>
                  </Row>
                </Open>
              </Info>
            </ProductCard>
          </TouchableOpacity>
        ))}
      </ProductScrollView>
       </>
    )
}