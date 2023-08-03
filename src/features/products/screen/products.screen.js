import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductComponents } from "../components/products.component";
import { useRoute } from "@react-navigation/native";
import { Search } from "../components/search.component";

export const ProductsScreen = ({ navigation }) => {
  const route = useRoute();
  const categoryId = route.params?.categoryId;

  return (
    <SafeArea>
        <Search/>
      <ProductComponents categoryId={categoryId} />
    </SafeArea>
  );
};
