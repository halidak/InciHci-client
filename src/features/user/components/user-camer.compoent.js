import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

export const UserCameraComponent = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImageUri(photo.uri);
      console.log("PHOTO URI:", photo);
      navigation.navigate("UpdateUser", { capturedImageUri: photo.uri });
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
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
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

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 20
            }}
            onPress={toggleCameraType}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Switch Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
