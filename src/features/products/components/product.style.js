import { Text, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import styled from 'styled-components/native';

export const Title = styled.Text`
    color: ${props => props.theme.colors.ui.primary};
    font-size: 16px;
`;

export const ProductCard = styled(Card)`
    background-color: ${props => props.theme.colors.ui.quaternary};
    margin-bottom: ${props => props.theme.space[3]};
    margin: ${props => props.theme.space[2]}; 
    padding: ${props => props.theme.space[2]}; 
`;

export const Info = styled.View`
    padding: ${props => props.theme.space[3]};
`;

export const RestaurantCardCover = styled(Card.Cover)`
    padding: ${props => props.theme.space[3]};
    background-color:  ${props => props.theme.colors.ui.quaternary};
`;

export const Open = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Row = styled.View`
    flex-direction: row;
    padding-top: ${props => props.theme.space[2]};
    padding-bottom: ${props => props.theme.space[2]};
`;

export const ProductScrollView = styled(ScrollView)`
    flex: 1;
    background-color: ${props => props.theme.colors.bg.primary};
`;

export const EmptyProductMessage = styled(Text)`
    margin: ${props => props.theme.space[3]};
    text-align: center;
`;

export const SectionEnd = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`