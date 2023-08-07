import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView, 
} from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsContext } from "../../../services/product/product-details.context";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, EmptyProductMessage, SectionEnd } from "./product.style";
import { RatingComponent } from "./rating.component";
import { List, Button } from "react-native-paper";
import { Favourite } from "./favourites.component";
import { CommentSection } from "./comments-section.component";

import { AuthContext } from "../../../services/auth/auth.context";
import { useFocusEffect } from '@react-navigation/native';


export const ProductDetailsComponent = ({ productId, navigation, route }) => {
  const { fetchProduct, isLoading, productDetails, getRating, rating, compositions, getCompositions, comments, getComments, addComment, setComments } = useContext(ProductDetailsContext);
  const [compositionsExpanded, setCompositionsExpanded] = useState(false);
  const {isAuth, logged} = useContext(AuthContext);
  const [latestRating, setLatestRating] = useState(rating);
  
  console.log(productId)

  // useEffect(() => {
  //   fetchProduct(productId);
  //   getCompositions(productId);
  //   getComments(productId);
  //   getRating(productId);
  // }, [productId]);

  useFocusEffect(
    React.useCallback(() => {
        fetchProduct(productId);
        getCompositions(productId);
        getComments(productId);
        getRating(productId);


    }, [productId])
);


  //console.log("Rating:", rating);
  //console.log('Product Details:', productDetails);
  //console.log('Compositions:', compositions);
  //console.log('Comments:', comments);


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          {productDetails ? (
            <>
              <ProductCard elevation={1} key={productDetails._id}>
                <View>
                {isAuth ? (
                  <>
                    <Favourite productId={productId} />
                    <Button
                      onPress={() => {
                        navigation.navigate("RateProduct", {
                          productId: productId,
                        });
                      }}
                    >
                      Rate the product
                      </Button>
                  </>
                ) : null}
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
                  <SectionEnd>
                    {isAuth ?  <Button
                      title="Rate the product"
                      onPress={() => {
                        navigation.navigate("RateProduct", {
                          productId: productId,
                        });
                      }}
                    /> : null}
                  </SectionEnd>
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
              <CommentSection comments={comments} navigation={navigation} addComment={addComment} productId={productId} setComments={setComments} getComments={getComments}/>
            </>
          ) : (
            <Text>No product details available.</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};
