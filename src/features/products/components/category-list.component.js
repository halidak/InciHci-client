import React, { useContext } from "react";
import { Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { CategoryContext } from "../../../services/category/category.context";
import styled from "styled-components/native";

const StyledListItem = styled(List.Item)`
  padding-vertical: 16px;
  padding-horizontal: 20px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const StyledListSection = styled(List.Section)`
  margin-bottom: -10px; /* Add this line to remove the space between items */
`;

const ArrowIcon = styled(List.Icon).attrs({
  icon: "chevron-right",
})`
  margin-left: auto;
  color: #888;
`;

export const CategoryList = ({navigation}) => {
  const { categories } = useContext(CategoryContext);

  return (
    <ScrollView>
      <StyledListSection>
        <List.Subheader>Categories</List.Subheader>
        {categories.map((category) => (
          <StyledListItem
            key={category._id}
            title={category.name}
            left={(props) => <List.Icon {...props} icon="flower" />}
            right={(props) => <ArrowIcon {...props} />}
            onPress={() => {
                navigation.navigate("Products", { categoryId: category._id });
            }}
          />
        ))}
      </StyledListSection>
    </ScrollView>
  );
};
