import React, { useRef, useContext, useState, useEffect } from "react";
import { CommentItem } from "./comment.component";
import { styled } from "styled-components/native";
import { View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";

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

export const CommentSection = ({ comments, navigation, addComment, productId, setComments, getComments }) => {
  const scrollViewRef = useRef();
  const { isAuth, user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handlePostComment = async () => {
    console.log(user._id);
    console.log(productId);
    console.log(comment);

    const addedComment = await addComment(user._id, productId, comment);
    console.log("moze");
    console.log("KOMENTAR:",addedComment);
    getComments(productId)
    setComments([...comments, addedComment]); 
    Keyboard.dismiss();
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
          {isAuth ? (

            <InputContainer>
            <Input placeholder="Add a comment..." 
              value={comment}
              onChangeText={(c) => setComment(c)}
            />
            <PostButton onPress={handlePostComment}>
              <PostButtonText>Post Comment</PostButtonText>
            </PostButton>
          </InputContainer>
          ) : (
            <Button title="Login to post a comment" onPress={() => navigation.navigate("Account")} />
          )}
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
