import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export const CameraComponent = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [capturedImageUri, setCapturedImageUri] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);
  
    const takePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();

        //console.log("Photo captured", photo);
        setCapturedImageUri(photo.uri);
        // Navigate back after taking the photo
        navigation.navigate("AddProduct", { capturedImageUri: photo.uri });
      }
    };
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={cameraRef} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
           <TouchableOpacity
  style={{
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40 // Adjust this value to control the distance from the bottom
  }}
  onPress={takePicture}
>
  <Text style={{ fontSize: 18, color: "white" }}>Take Photo</Text>
</TouchableOpacity>

          </View>
        </Camera>
      </View>
    );
}