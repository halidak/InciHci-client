import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage } from "./product.style";
import { ProductContext } from "../../../services/product/product.context";
import { Search } from "./search.component";
import { Favourite } from "./favourites.component";
import { AuthContext } from "../../../services/auth/auth.context";
import { useFocusEffect } from '@react-navigation/native';


export const ProductComponents = ({ categoryId, navigation }) => {
  const { products, isLoading, error, onRefresh } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 500);

    return () => clearTimeout(delayFilter);
  }, [searchQuery, products]);

  // Check if there's an error
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Check if isLoading is true
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (filteredProducts.length === 0) {
    return <EmptyProductMessage><Text>No products available.</Text></EmptyProductMessage>;
  }

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetails", { productId });
  };

  return (
    <>
      <Search setSearchQuery={setSearchQuery} />
      <ProductScrollView>
        {filteredProducts.map((product) => (
          <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
            <ProductCard elevation={5} key={product._id}>
              <View>
                {isAuth ? 
                <Favourite productId={product._id}/> : null
                }
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
    </>
  );
};
