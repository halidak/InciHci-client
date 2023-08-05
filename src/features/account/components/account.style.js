import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import { Button } from 'react-native-paper';

export const AccountBackground = styled.ImageBackground.attrs({
    source: require("../../../../assets/back.jpg")
})`
    background-color: #ddd;
    flex: 1;
    align-items: center;
    justify-content: center;
    `;

export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.24);
`;

export const AccountContainer = styled.View`
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    margin-top: 10px;
`;

export const AuthButton = styled(Button).attrs({
    color: colors.brand.primary,
})`
    margin-top: 20px;
    border-radius: 10px;
    padding: 5px;
`;

export const AuthInput = styled.TextInput`
    width: 100%;
    padding: 10px;
    border-width: 1px;
    border-color: #ccc;
    margin-bottom: 10px;
    border-radius: 8px;
`;