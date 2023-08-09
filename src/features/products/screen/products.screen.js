import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductComponents } from "../components/products.component";
import { useRoute } from "@react-navigation/native";
import { Search } from "../components/search.component";
import { ProductContextProvider } from "../../../services/product/product.context";
import { TypeProductContextProvider } from "../../../services/product/type-product.context";

export const ProductsScreen = ({ navigation }) => {
  const route = useRoute();
  const categoryId = route.params?.categoryId;

  return (
    <SafeArea>
        <TypeProductContextProvider categoryId={categoryId}>
      <ProductComponents categoryId={categoryId} navigation={ navigation }/>
        </TypeProductContextProvider>
    </SafeArea>
  );
};
