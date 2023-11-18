import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";

export default function CameraIA({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [error, setError] = useState();
  const cameraRef = useRef(null);

  function handleIAResponse(prediction) {
    let recipe = null;
    switch (response) {
      case "pancakes":
    }
    recipe !== null ? navigation.navigate("Details", recipe) : setError(true);
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      console.log(photo.uri);
      setSelectedImage(photo.uri);
      uploadPhoto(photo.uri);
    }
  };
  const uploadPhoto = async (photo) => {
    console.log(photo);
    const formData = new FormData();
    formData.append("file", {
      uri: photo,
      type: "image/jpg",
      name: "image.jpg",
    });

    const apiUrl = "http://148.220.213.234:8000/predict";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultJson = await response.json();
      console.log(resultJson);
      setError(false);
    } catch (error) {
      console.error("Error during fetch:", error);
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      {hasCameraPermission && (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
        />
      )}
      <Image
        source={require("../../assets/images/camera/PhotoFrame.png")}
        style={styles.cameraFrame}
      />
      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <Image source={require("../../assets/images/camera/PhotoButton.png")} />
      </TouchableOpacity>
      {error && (
        <View>
          <Text>A ocurrido un error con la IA.</Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  cameraFrame: {
    width: 300,
    height: 300,
    position: "absolute",
    alignSelf: "center",
    top: "35%",
  },
  cameraButton: {
    position: "absolute",
    alignSelf: "center",
    top: "75%",
    padding: 5,
  },
});
