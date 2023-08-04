import React, { useRef } from "react";
import { CommentItem } from "./comment.component";
import { styled } from "styled-components/native";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TouchableOpacity } from "react-native";

const Container = styled.View`
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
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

const EmptyMessage = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #333;
  margin-top: 20px;
`;

export const CommentSection = ({ comments }) => {
  const scrollViewRef = useRef();

  const handlePostComment = () => {
    // Add logic to post the comment
    Keyboard.dismiss(); // Hide the keyboard after posting the comment
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <Container>
          <Title>Comments</Title>
          <InputContainer>
            <Input placeholder="Add a comment..." />
            <PostButton onPress={handlePostComment}>
              <PostButtonText>Post Comment</PostButtonText>
            </PostButton>
          </InputContainer>
          {comments.length === 0 ? (
            <EmptyMessage>No comments available.</EmptyMessage>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
