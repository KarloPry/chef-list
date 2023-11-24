import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import NavBar from "../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

export default function CameraIA() {
  const [selectedImage, setSelectedImage] = useState(null);
  const isFocused = useIsFocused();
  const cameraRef = useRef();
  const [key, setKey] = useState(0);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //Hola
  const [error, setError] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  async function handleIAResponse(prediction) {
    let recipe = 0;
    console.log("KKKK");
    switch (prediction) {
      case "pancakes":
        console.log("pancakes");
        recipe = require("../../data/comida.json").filter(
          (recipe) => recipe.id == 1
        );
        break;
      case "lasagna":
        console.log("lasagna");
        recipe = require("../../data/comida.json").filter(
          (recipe) => recipe.id == 1
        );
        break;
      case "cheesecake":
        console.log("cheesecake");
        recipe = require("../../data/comida.json").filter(
          (recipe) => recipe.id == 1
        );
        break;
      default:
        recipe = null;
        break;
    }
    recipe = recipe[0];
    recipe !== null
      ? navigation.navigate("Details", { recipe })
      : setError(true);
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        cameraRef.current.pausePreview();
        setSelectedImage(photo.uri);
        await uploadPhoto(photo.uri); // Added await here
      } catch (error) {
        console.error("Error taking photo:", error);
        setError(true);
      }
    }
  };
  const uploadPhoto = async (photo) => {
    const formData = new FormData();
    formData.append("file", {
      uri: photo,
      type: "image/jpg",
      name: "image.jpg",
    });
    const apiUrl = "http://192.168.43.54:8000/predict";
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
      console.log(resultJson.PredictedClass);
      handleIAResponse(resultJson.PredictedClass);
      setError(false);
    } catch (error) {
      console.error("Error during fetch:", error);
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      {!hasCameraPermission && (
        <View>
          <Text>No se ha concedido el permiso de la cámara.</Text>
        </View>
      )}
      {isFocused && (
        <Camera
          key={key}
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
