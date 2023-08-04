import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsContext } from "../../../services/product/product-details.context";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, ProductScrollView, EmptyProductMessage} from "./product.style";

export const ProductDetailsComponent = ({ productId }) => {
  const { fetchProduct, isLoading, productDetails, getRating, rating } = useContext(ProductDetailsContext); 

  useEffect(() => {
    fetchProduct(productId);
    getRating(productId);
  }, [productId]);

  console.log("Rating:", rating);

  // console.log(productDetails);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeArea>
      {productDetails ? (
         <ProductScrollView>
             <ProductCard elevation={5} key={productDetails._id}>
                 <View>
                     <RestaurantCardCover source={{ uri: productDetails.image }} />
                 </View>
                 <Info>
                     <Title>{productDetails.name}</Title>
                     <Open>
                         <Row>
                             <Text>{productDetails.company}</Text>
                         </Row>
                     </Open>
                     <Open>
                         <Row>
                             <Text>{productDetails.description}</Text>
                         </Row>
                     </Open>
                 </Info>
             </ProductCard>
     </ProductScrollView>
      ) : (
        <Text>No product details available.</Text>
      )}
    </SafeArea>
  );
};
