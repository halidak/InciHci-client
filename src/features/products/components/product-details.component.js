import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsContext } from "../../../services/product/product-details.context";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, EmptyProductMessage} from "./product.style";
import { RatingComponent } from "./rating.component";
import { List } from "react-native-paper";
import { Favourite } from "./favourites.component";
import { CommentSection } from "./comments-section.component";

export const ProductDetailsComponent = ({ productId }) => {
  const { fetchProduct, isLoading, productDetails, getRating, rating, compositions, getCompositions } = useContext(ProductDetailsContext);
  const [compositionsExpanded, setCompositionsExpanded] = useState(false);

  useEffect(() => {
    fetchProduct(productId);
    getRating(productId);
    getCompositions(productId);
  }, [productId]);

  console.log("Rating:", rating);
  //console.log('Product Details:', productDetails);
  console.log('Compositions:', compositions);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {productDetails ? (
          <>
            <ProductCard elevation={1} key={productDetails._id}>
              <View>
                <Favourite />
                <RestaurantCardCover source={{ uri: productDetails.image }} />
              </View>
              <Info>
                <Title>{productDetails.name}</Title>
                <Open>
                  <Row>
                    <Text>{productDetails.company}</Text>
                  </Row>
                </Open>
                <RatingComponent rating={rating} />
                <Open>
                  <Row>
                    <Text>{productDetails.description}</Text>
                  </Row>
                </Open>
              </Info>
            </ProductCard>
            <List.Accordion
              title="Compositions"
              left={(props) => <List.Icon {...props} icon="flower" />}
            >
              {compositions.length === 0 ? (
                <Text>No compositions available.</Text>
              ) : (
                compositions.map((composition) => (
                  <List.Item key={composition.id} title={composition.name} />
                ))
              )}
            </List.Accordion>
            <CommentSection />
          </>
        ) : (
          <Text>No product details available.</Text>
        )}
      </KeyboardAvoidingView>
    </SafeArea>
  );
};
