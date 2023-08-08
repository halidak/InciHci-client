import React, {useContext} from 'react';
import { View, Image, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { AuthContext } from '../../../services/auth/auth.context';
import { ProductDetailsContext } from '../../../services/product/product-details.context';

const CommentContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  
`;

const ImageContainer = styled.View`
flex-direction: row; 
  align-items: center;  
`;

const Username = styled.Text`
  font-weight: bold;
  margin-left: 10px;
`;

const Content = styled.Text`
  margin-top: 5px;
  margin-left: 50px;
`;

const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;


export const CommentItem = ({ comment }) => {
  const {user} = useContext(AuthContext);
  const {removeComment} = useContext(ProductDetailsContext);

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
        text: "Delete", onPress: () => removeComment(comment._id)
      }
    ],
    { cancelable: false }
  );


  const username = comment.user
    ? `${comment.user.firstName} ${comment.user.lastName}`
    : "NA";
    return (
      <CommentContainer>
        <ImageContainer>

        {
          comment.user && comment.user.image ? (
            <AvatarImage source={{ uri: comment.user.image }} />
            ) : (
              <Avatar.Text size={40} label={username[0]} />
              )
            }
        <Username>{username}</Username>
                    {
              user?._id === comment.user?._id ? (
                <Button onPress={deleteAlert} icon="delete" />
              ) : null
            }
            </ImageContainer>
        <Content>{comment.content}</Content>
      </CommentContainer>
    );
  };
  