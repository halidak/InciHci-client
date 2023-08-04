import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const CommentContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const Username = styled.Text`
  font-weight: bold;
`;

const Content = styled.Text`
  margin-top: 5px;
`;

export const CommentItem = ({ comment }) => {
    return (
      <CommentContainer>
        <Username>{comment.user.firstName} {comment.user.lastName}</Username>
        <Content>{comment.content}</Content>
      </CommentContainer>
    );
  };
  