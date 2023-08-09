import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import { Button, TextInput } from 'react-native-paper';
import { Text } from 'react-native';

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

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const DescInput = styled(TextInput)`
  width: 300px;
  height: 100px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
