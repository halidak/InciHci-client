import React, {useContext} from "react";
import { View, Text, ScrollView, ActivityIndicator  } from "react-native";
import { Card } from "react-native-paper";
import styled from 'styled-components/native';

import { ProductContext } from "../../../services/product/product.context";

const Title = styled.Text`
    color: ${props => props.theme.colors.ui.primary};
    font-size: 16px;
`;

const ProductCard = styled(Card)`
    background-color: ${props => props.theme.colors.ui.quaternary};
    margin-bottom: ${props => props.theme.space[3]};
    margin: ${props => props.theme.space[2]}; 
    padding: ${props => props.theme.space[2]}; 
`;

const Info = styled.View`
    padding: ${props => props.theme.space[3]};
`;

const RestaurantCardCover = styled(Card.Cover)`
    padding: ${props => props.theme.space[3]};
    background-color:  ${props => props.theme.colors.ui.quaternary};
`;

const Open = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Row = styled.View`
    flex-direction: row;
    padding-top: ${props => props.theme.space[2]};
    padding-bottom: ${props => props.theme.space[2]};
`;

const ProductScrollView = styled(ScrollView)`
    flex: 1;
    background-color: ${props => props.theme.colors.bg.primary};
`;

const EmptyProductMessage = styled(Text)`
    margin: ${props => props.theme.space[3]};
    text-align: center;
`;


export const ProductComponents = ({ categoryId }) => {
    const { products, isLoading, error } = useContext(ProductContext);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    
    if (products.length === 0) {
        return <EmptyProductMessage>No products available.</EmptyProductMessage>;
    }


  return (
    <ProductScrollView>
            {products.map((product) => (
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
            ))}
        </ProductScrollView>
  );
};
