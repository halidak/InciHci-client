import React from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

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
            </ImageContainer>
        <Content>{comment.content}</Content>
      </CommentContainer>
    );
  };
  