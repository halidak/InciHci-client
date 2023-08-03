import React, {useContext, useState, useEffect} from "react";
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

const SearchContainer = styled.View`
  padding: 16px;
`;

export const Search = () => {
   
    return (
        <SearchContainer>
        <Searchbar 
          placeholder="Search for a product"
          />
      </SearchContainer>
    )
}