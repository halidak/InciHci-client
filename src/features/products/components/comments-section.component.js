import React, { useState } from 'react';
import { View, Text, TextInput, SectionList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { CommentItem } from './comment.component';

export const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newCommentObj = {
      username: 'JohnDoe',
      content: newComment,
      likes: 0,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const renderCommentItem = ({ item }) => <CommentItem {...item} />;
  const commentSections = [{ data: comments, renderItem: renderCommentItem, keyExtractor: (item, index) => index.toString() }];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <SectionList
          sections={commentSections}
          renderItem={({ item }) => <CommentItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={() => <></>}
        />
        <InputContainer>
          <CommentInput
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <PostButton onPress={handleAddComment}>
            <PostButtonText>Post Comment</PostButtonText>
          </PostButton>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled(View)`
  flex: 1;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`;

const CommentInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ccc;
`;

const PostButton = styled(TouchableOpacity)`
  margin-left: 10px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  background-color: tomato;
  border-radius: 8px;
`;

const PostButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
