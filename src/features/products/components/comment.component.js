import React from 'react';
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

export const CommentItem = ({ username, content }) => {
    return (
      <CommentContainer>
        <Username>{username}</Username>
        <Content>{content}</Content>
      </CommentContainer>
    );
  };
  