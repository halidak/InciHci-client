import React from "react";
import {SafeArea} from '../../../components/utility/safe-area.component';
import { UpdateUserComponent } from "../components/update-user.component";

export const UpdateUserScreen = ({ navigation, route }) => {
    const capturedImageUri = route.params?.capturedImageUri;
    console.log("slika iz screena", capturedImageUri);
    return (
      <SafeArea>
        <UpdateUserComponent navigation={navigation} capturedImageUri={capturedImageUri}/>
      </SafeArea>
    );
  }
  