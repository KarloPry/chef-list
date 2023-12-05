import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FoodCard from "../../components/FoodCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NavBar from "../../components/NavBarProfile";

export default function Profile({ navigation }) {
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/profile.png")
  );
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editableFields, setEditableFields] = useState(false);
  const DATA = require("../../data/comida.json");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Obtén el usuario logeado desde AsyncStorage al cargar la pantalla
    getLoggedUser();
  }, []);

  const getLoggedUser = async () => {
    try {
      const userString = await AsyncStorage.getItem("logged_user");
      if (userString) {
        const user = JSON.parse(userString);
        setUserName(user.user_name);
        setUserEmail(user.user_email);
        setUserPassword(user.user_password);
      }
    } catch (error) {
      console.error("Error al obtener el usuario logeado:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeProfileImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log("Image URI:", result.assets[0].uri);
        setProfileImage({ uri: result.assets[0].uri });
      }

      if (!result.cancelled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleEditPress = () => {
    setEditableFields(true);
  };

  const handleSavePress = () => {
    setEditableFields(false);
  };

  const handleCancelPress = () => {
    getLoggedUser();
    setEditableFields(false);
  };

  return (
    <>
      <NavBar onEditPress={handleEditPress} />
      <ScrollView>
        <TouchableOpacity
          onPress={changeProfileImage}
          style={styles.profileImageContainer}
        >
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.text}>Bienvenido</Text>

        {/* Nombre de usuario */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={userName}
            editable={editableFields}
            onChangeText={setUserName}
          />
          {editableFields && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSavePress}
                style={styles.saveButton}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelPress}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Correo electrónico */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Correo:</Text>
          <TextInput
            style={styles.inputs}
            value={userEmail}
            editable={editableFields}
            onChangeText={setUserEmail}
          />
          {editableFields && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSavePress}
                style={styles.saveButton}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelPress}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.text}>Platillo favorito:</Text>
        <FoodCard style={styles.platillo} recipe={DATA[1]} />

        <Text style={styles.text}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={userPassword}
            editable={editableFields}
            secureTextEntry={!showPassword}
            onChangeText={setUserPassword}
          />
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={styles.toggleButton}
          >
            <Text style={styles.buttonText}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        {editableFields && (
          <View style={styles.buttonContainerPwd}>
            <TouchableOpacity
              onPress={handleSavePress}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelPress}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottonLogout}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Login")
          }}>
            <Text style={{ color: "white", textAlign: "center", fontSize:20,}}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "#537D3D",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    color: "#537D3D",
    // textAlign: "center",
  },
  inputs: {
    height: 40,
    width: 350,
    marginTop: 5,
    // textAlign: "center",
    color: "#000",
    fontSize: 23,
    alignSelf: "center",
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 30,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    height: 40,
    width: 240,
    textAlign: "center",
    fontSize: 20,
    color: "#000",
    alignSelf: "center",
    marginBottom: 5,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#537D3D",
  },
  buttonContainerPwd: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#537D3D",
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#EC4437",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  bottonLogout: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#F28B0C",
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
    alignContent: "left",
  },
});
