import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

const SearchContainer = styled.View`
  padding: 16px;
`;

export const Search = ({ setSearchQuery }) => { // Receive setSearchQuery prop
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a product"
        onChangeText={(query) => setSearchQuery(query)} // Update the search query on text change
      />
    </SearchContainer>
  )
}
