import React, { useContext, useEffect } from "react";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { AuthContext } from "../../../services/auth/auth.context";
import { Text, TouchableOpacity, View } from "react-native";
import { ProductComponents } from "../../products/components/products.component";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage } from "../../products/components/product.style";
import { Favourite } from "../../products/components/favourites.component";

export const UserFavouritesScreen = ({ navigation }) => {
    const { loadFavourites, favourites } = useContext(FavouritesContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user._id) {
            loadFavourites(user._id);
        }
    }, [user]);

    console.log("Favourites:", favourites);

    const handleProductPress = (productId) => {
        navigation.navigate("ProductDetails", { productId });
    };

    if (!favourites.likedProducts || favourites.likedProducts.length === 0) {
        return (
            <EmptyProductMessage>No favourites available.</EmptyProductMessage>
        );
    }
    

    return (
        <ProductScrollView>
            {favourites.likedProducts.map((product) => (
                <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
                    <ProductCard elevation={5}>
                        <View>
                            <Favourite productId={product._id} />
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
}
