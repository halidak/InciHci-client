import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView, 
  StyleSheet,
  Alert
} from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductDetailsContext } from "../../../services/product/product-details.context";
import { Title, ProductCard, Info, RestaurantCardCover, Open, Row, EmptyProductMessage, SectionEnd } from "./product.style";
import { RatingComponent } from "./rating.component";
import { List, Button, Menu, Divider, PaperProvider, Provider, IconButton } from "react-native-paper";
import { Favourite } from "./favourites.component";
import { CommentSection } from "./comments-section.component";

import { AuthContext } from "../../../services/auth/auth.context";
import { useFocusEffect } from '@react-navigation/native';
import { ProductContext } from "../../../services/product/product.context";


export const ProductDetailsComponent = ({ productId, navigation, route }) => {
  const { fetchProduct, isLoading, productDetails, getRating, rating, compositions, getCompositions, comments, getComments, addComment, setComments } = useContext(ProductDetailsContext);
  const [compositionsExpanded, setCompositionsExpanded] = useState(false);
  const {isAuth, logged, user} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const {deleteProduct} = useContext(ProductContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const deleteAlert = () =>
  Alert.alert(
    "Delete comment",
    "Are you sure you want to delete this comment?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Delete", onPress: () => handleDelete()
      }
    ],
    { cancelable: false }
  );

  const handleDelete = async() => {
    await deleteProduct(productId);
    navigation.navigate("Category")
  }


  
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
       <Provider>
       <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          {productDetails ? (
            <>
              <ProductCard elevation={1} key={productDetails._id}>
              <View style={styles.container}>
          {user?._id === productDetails.user?._id ? ( <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
             <IconButton
                icon="dots-vertical"
                onPress={openMenu}
                style={styles.iconButton}
              />
            }
          >
            <Menu.Item onPress={() => {}} title="Update product" />
            <Menu.Item onPress={deleteAlert} title="Delete product" />
            <Divider />
            <Menu.Item onPress={() => navigation.navigate("AddCompositions", { productId: productId })} title="Add compositions" />
          </Menu> ) : null}
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
      </View>
      </Provider>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    alignSelf: "center",
    marginTop: 16,
  },
});