import React, { useEffect, useState } from "react";
import { View, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NavBar from "../../components/NavBar";

export default function Camera({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
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
      console.log(result.assets[0].uri)
      setSelectedImage(result.assets[0].uri);
      uploadImage(result);
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };

  const uploadImage = async (result) => {
    const formData = new FormData();
    formData.append("file", {
      uri: result.assets[0].uri,
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
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  

  return (
    <>
      <NavBar />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </>
  );
}
