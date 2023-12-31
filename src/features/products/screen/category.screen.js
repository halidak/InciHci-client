import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CategoryList } from "../components/category-list.component";

export const CategoryScreen = ({ navigation }) => {
    
    return(
        <SafeArea>
            <CategoryList navigation={navigation}/>
        </SafeArea>
    )
}