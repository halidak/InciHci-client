import React, { useContext, useEffect } from "react";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { AuthContext } from "../../../services/auth/auth.context";
import { Text, TouchableOpacity, View } from "react-native";
import { ProductComponents } from "../../products/components/products.component";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage } from "../../products/components/product.style";
import { Favourite } from "../../products/components/favourites.component";

export const UserPostedScreen = ({ navigation }) => {
    const { userProducts, getUserPosted } = useContext(FavouritesContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getUserPosted(user._id);
    }, []);

    console.log(userProducts);

    const handleProductPress = (productId) => {
        navigation.navigate("ProductDetails", { productId });
    };

    if (userProducts.length === 0) {
        return (
            <EmptyProductMessage>No products available.</EmptyProductMessage>
        )
    }

    return (
        <ProductScrollView>
            {userProducts.map((product) => (
                <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
                    <ProductCard elevation={5}>
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
    )
}