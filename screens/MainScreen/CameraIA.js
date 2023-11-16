import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";

export default function CameraIA({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [error, setError] = useState();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
      uploadImage(result);
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      console.log(photo.uri);
      setSelectedImage(photo.uri);
      uploadImage(photo);
    }
  };

  const uploadImage = async (result) => {
    const formData = new FormData();
    formData.append("file", {
      uri: result.uri,
      type: "image/jpeg",
      name: "image.jpeg",
    });

    const apiUrl = "https://fastapi-production-f32f.up.railway.app/predict";

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
      setError(false)
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
      <CustomButton
        text="Elige una imagen"
        action={pickImage}
        color={"orange"}
      />
      <CustomButton text="Toma una foto" action={takePhoto} color={"orange"} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {error && (
        <View>
          <Text>A ocurrido un error con la IA.</Text>
        </View>
      )}
    </>
  );
}
