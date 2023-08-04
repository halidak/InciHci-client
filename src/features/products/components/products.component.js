import React, {useContext} from "react";
import { View, Text, ActivityIndicator, TouchableOpacity  } from "react-native";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage} from "./product.style";

import { ProductContext } from "../../../services/product/product.context";


export const ProductComponents = ({ categoryId, navigation }) => {
    const { products, isLoading, error } = useContext(ProductContext);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (products.length === 0) {
        return <EmptyProductMessage>No products available.</EmptyProductMessage>;
    }

    const handleProductPress = (productId) => {
        navigation.navigate("ProductDetails", { productId });
    };

  return (
    <ProductScrollView>
            {products.map((product) => (
                <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
                <ProductCard elevation={5} key={product._id}>
                    <View>
                        <RestaurantCardCover source={{ uri: product.image }} />
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
  );
};
